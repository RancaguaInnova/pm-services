import jwt from "jsonwebtoken";
import { Errors } from "moleculer";
import moment from "moment";

const validatePassword = async (service, password: string, user) => {
  try {
    await service.checkPasswords(service, password, user);
  } catch (error) {
    service.logger.error(error);
    return Promise.reject(
      new Errors.MoleculerClientError(
        "Incorrect email or password",
        401,
        "InvalidCredentials",
      ),
    );
  }
};

const getUser = async (service, context, query) => {
  try {
    // context.call is an alias for broker.call but it sets itself as parent context (due to tracing)
    const users = await context.call("v1.users.findByQuery", { query });

    return users[0];
  } catch (error) {
    service.logger.error("Error finding user by query:", error.messsage);
    return Promise.reject(
      new Errors.MoleculerClientError(
        `Error finding user: ${error.message}`,
        404,
        "NotFound",
      ),
    );
  }
};

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
      let user = await getUser(this, context, { "email.address": email });
      await validatePassword(this, password, user);

      user = await this.updateAuthToken(user._id, email, user.role);
      delete user.services.password;
      delete user.services.validationToken;
      return await this.transfromDocuments(context, {}, user);
    } catch (error) {
      this.logger.error(error);
    }
  },
};
