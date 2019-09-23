import bcrypt from "bcryptjs";
import * as moleculer from "moleculer";

/**
 * Check passwords
 *
 * @param {Object} Service Moleculer service instance
 * @param {String} password Password used on login
 * @param {Object} user User entity
 *
 * @returns {Boolean} The password exists or not
 */
const checkPasswords = async (service, password: string, user) => {
  try {
    return await bcrypt.compare(password, user.services.password.bcrypt);
  } catch (error) {
    service.logger.error("Could not compare passwords:", error.message);
    return Promise.reject(
      new moleculer.Errors.MoleculerServerError(
        `Could not compare passwords: ${error.message}`,
        500,
        "InternalServerError",
      ),
    );
  }
};

export default checkPasswords;
