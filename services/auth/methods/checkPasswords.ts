import bcrypt from "bcryptjs";
import { Errors } from "moleculer";

/**
 * Check passwords
 *
 * @param {String} password Password used on login
 * @param {Object} user User entity
 *
 * @returns {Boolean} The password exists or not
 */
const checkPasswords = async (password: string, user) => {
  try {
    return await bcrypt.compare(password, user.services.password.bcrypt);
  } catch (error) {
    this.logger.error("Could not compare passwords:", error.message);
    return Promise.reject(
      new Errors.MoleculerServerError(
        `Could not compare passwords: ${error.message}`,
        500,
        "InternalServerError",
      ),
    );
  }
};

export default checkPasswords;
