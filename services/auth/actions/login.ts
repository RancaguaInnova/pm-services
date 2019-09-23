import jwt from "jsonwebtoken";
import moleculer from "moleculer";
import moment from "moment";

const validatePassword = async (service, password, user) => {
  try {
    await service.checkPasswords(service, password, user);
  } catch (error) {
    service.logger.error(error);
    return Promise.reject(
      new moleculer.Errors.MoleculerClientError(
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
      new moleculer.Errors.MoleculerClientError(
        `Error finding user: ${error.message}`,
        404,
        "NotFound",
      ),
    );
  }
};

const renewAuthToken = async (service, tokenData, context) => {
  // No Session management. Using JWT solution
  // TODO: Implement a call to remote users service
  try {
    // TODO: This is used at user creation on Users service. Maybe generalize it?
    const { _id, role, email } = tokenData;
    const id = typeof _id === "string" ? _id : _id.toString();
    const expiresAt = moment().add(3, "m");
    const token = jwt.sign({ id, email, role, expiresAt }, process.env.JWT_SECRET);
    return await context.call("v1.users.updateAuthToken", { id, token });
  } catch (error) {
    service.logger.error("Error setting token on user", error.message);
    return Promise.reject(error);
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

      const tokenData = {
        _id: user._id,
        email,
        role: user.role,
      };
      user = await renewAuthToken(this, tokenData, context);
      delete user.services.password;
      delete user.services.validationToken;
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  },
};
