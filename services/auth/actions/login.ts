import { Errors } from "moleculer";

/** * Log a User in
 *
 * @param {String} email Users email
 * @param {String} password Users password
 *
 * @returns {String} Users Auth token
 */
export default {
  params: {
    email: { type: "email" },
    password: { type: "string", min: 8 },
  },
  async handler(context) {
    let { email } = context.params;
    email = email.toLowerCase();
    const { password } = context.params;

    try {
      const user = await this.adapter.findOne({ "email.address": email });
      const isValidPassword = await this.checkPasswords(password, user);
      return isValidPassword ? await this.transformDocuments(context, {}, user) : Promise.reject(
        new Errors.MoleculerClientError(
          "Invalid Credentials",
          401,
          "InvalidCredentials",
        ),
      );
    } catch (error) {
      this.logger.error(error);
      return Promise.reject(
        new Errors.MoleculerClientError(
          `Error finding user: ${error.message}`,
          404,
          "NotFound",
        ),
      );
    }
  },
};
