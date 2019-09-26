import { Errors } from "moleculer";

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
      if (await this.userExists(this, email)) {
        return Promise.reject(
          new Errors.MoleculerClientError(
            `The email: ${email} has already been registered`,
            409,
            "EmailExists",
          ),
        );
      }

      const entity = this.generateEntity(this, identifier, email, password);
      await this.validateEntity(entity);
      const user = await this.insertUser(this, entity);

      // Send account validation email
      // await sendEmailValidationEmail(context, email, user.services.validationToken);

      await this.addLogInfo(context, user._id);
      return await this.transformDocuments(context, {}, user);
    } catch (error) {
      this.logger.error("Error creating User:", error);
      return Promise.reject(
        new Errors.MoleculerServerError(
          `Error creating User: ${error.message}`,
          500,
          `${error.message}`,
        ),
      );
    }
  },
};
