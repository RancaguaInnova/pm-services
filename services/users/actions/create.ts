import { Errors } from "moleculer";
import uuid from "uuid";

interface IUserEntity {
  identifier: string;
  email: {
    address: string,
    verified: boolean,
  };
  services: {
    password: {
      bcrypt: string,
      createdAt: Date,
    },
    authToken: "",
    validationToken: string,
  };
  role: {
    id: string,
    name: string,
  };
  createdAt: Date;
}

const userExists = async (service, email: string): Promise<boolean> => {
  try {
    const user = await service.adapter.findOne({ "email.address": email });
    const exists = user ? true : false;
    return exists;
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerServerError(
        `Error finding user: ${error.message}`,
        500,
        "InternalServerError",
      ),
    );
  }
};

const generateEntity = (service, identifier: string, email: string, password: string): IUserEntity =>  {
  return {
    identifier,
    email: {
      address: email,
      verified: false,
    },
    services: {
      password: {
        bcrypt: service.hashPassword(password),
        createdAt: new Date(),
      },
      authToken: "",
      validationToken: uuid.v1(),
    },
    role: {
      id: "5d7a5c277e5a622c30ad3e3a",
      name: "activityReporter",
    },
    createdAt: new Date(),
  };
};
const insertUser = async (service, entity: IUserEntity) => {
  try {
    return await service.adapter.insert(entity);
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerServerError(
        `Insert operation failed: ${error.message}`,
        500,
        "InsertFailed",
      ),
    );
  }
};

const sendEmailValidationEmail = async (context, email: string, token: string) => {
  try {
    context.call("v1.notifications.sendEmail", { options: {
      to: [email],
      subject: "Bienvenido a Rancagua-Digital",
      title: "Te damos la bienvenida!",
      subtitle: "Valida tu cuenta",
      body: `
        Para validar tu cuenta, haz click <a href="${process.env.SERVICE_URL}/auth/validate/${token}" target="_blank" style="color:#ff1148; text-decoration: none">aquí</a>
        <br/>
        <br/>
        <br/>
        Atentamente,<br/>
        <span style="display: inline-block; margin-left: 10px;"><strong style="color:#ff1148;">Equipo Rancagua Digital</strong></span>
      `,
    } });
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerServerError(
        `Notification error: ${error.message}`,
        500,
        "NotificationError",
      ),
    );
  }
};

/**
 * Create User
 *
 * @param {String} email Users email
 * @param {String} password Users password
 * @param {Object} profile Users profile fields
 *
 * @returns {String} Users Auth token
 */
export default {
  params: {
    email: { type: "string"},
    password: { type: "string"},
    identifier: { type: "string" },
  },
  async handler(context) {
    let { email } = context.params;
    email = email.toLowerCase();
    const { password, identifier } = context.params;

    if (await userExists(this, email)) {
      return Promise.reject(
        new Errors.MoleculerClientError(
          `The email: ${email} has already been registered`,
          409,
          "EmailExists",
        ),
      );
    }

    const entity = generateEntity(this, identifier, email, password);

    try {
      await this.validateEntity(entity);
    } catch (error) {
      return error;
    }

    let user = await insertUser(this, entity);
    user = await this.updateAuthToken(user._id, email, entity.role);

    // Send account validation email
    // await sendEmailValidationEmail(context, email, user.services.validationToken);

    try {
      await this.addLogInfo(context, user._id);
      return await this.transformDocuments(context, {}, user);
    } catch (error) {
      this.logger.error("Error creating User:", error);
      return Promise.reject(
        new Errors.MoleculerServerError(
          `Could not add info to Log: ${error.message}`,
          500,
          `${error.message}`,
        ),
      );
    }
  },
};
