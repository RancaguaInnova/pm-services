import jwt from "jsonwebtoken";
import { Errors } from "moleculer";
import moment from "moment";
import uuid from "uuid";

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

    try {
      const userExists = await this.adapter.findOne({ "email.address": email });
      if (userExists) {
        return Promise.reject(
          new Errors.MoleculerClientError(
            `The email: ${email} has already been registered`,
            409,
            "EmailExists",
          ),
        );
      }
    } catch (error) {
      return Promise.reject(
        new Errors.MoleculerServerError(
          `Error finding user: ${error.message}`,
          500,
          "InternalServerError",
        ),
      );
    }

    // Used email validation
    const validationToken = uuid.v1();
    const entity = {
      identifier,
      email: {
        address: email,
        verified: false,
      },
      services: {
        password: {
          bcrypt: this.hashPassword(password),
          createdAt: new Date(),
        },
        authToken: "",
        validationToken,
      },
      role: "activityReporter",
      createdAt: new Date(),
    };

    try {
      await this.validateEntity(entity);
    } catch (error) {
      return error;
    }

    let user;
    try {
      user = await this.adapter.insert(entity);
    } catch (error) {
      return Promise.reject(
        new Errors.MoleculerServerError(
          `Insert operation failed: ${error.message}`,
          500,
          "InsertFailed",
        ),
      );
    }

    let authToken;
    try {
      // TODO: This is used at user login on Auth service. Maybe generalize it?
      const expiresAt = moment().add(3, "m");
      authToken = jwt.sign({ id: user._id, email, role: entity.role, expiresAt }, process.env.JWT_SECRET);
      user = await this.adapter.updateById(user._id, { $set: { "services.authToken": authToken } });
    } catch (error) {
      return Promise.reject(
        new Errors.MoleculerServerError(
          `Token update operation failed: ${error.message}`,
          500,
          "InsertFailed",
        ),
      );
    }

    // TODO: Implement account validation notification service call
    // Send account validation email
    // try {
    //   context.call("v1.notifications.sendEmail", { options: {
    //     to: [email],
    //     subject: "Bienvenido a Rancagua-Digital",
    //     title: "Te damos la bienvenida!",
    //     subtitle: "Valida tu cuenta",
    //     body: `
    //       Para validar tu cuenta, haz click <a href="${process.env.SERVICE_URL}/auth/validate/${validationToken}" target="_blank" style="color:#ff1148; text-decoration: none">aquí</a>
    //       <br/>
    //       <br/>
    //       <br/>
    //       Atentamente,<br/>
    //       <span style="display: inline-block; margin-left: 10px;"><strong style="color:#ff1148;">Equipo Rancagua Digital</strong></span>
    //     `,
    //   } });
    // } catch (error) {
    //   return Promise.reject(
    //     new Errors.MoleculerServerError(
    //       `Notification error: ${error.message}`,
    //       500,
    //       "NotificationError",
    //     ),
    //   );
    // }

    try {
      await this.addLogInfo(context, user._id);
      const transformed = await this.transformDocuments(context, {}, user);
      return transformed;
    } catch (error) {
      this.logger.error("Error creating User:", error);
      return Promise.reject(
        new Errors.MoleculerClientError(
          `Could not add info to Log: ${error.message}`,
          500,
          `${error.message}`,
        ),
      );
    }
  },
};
