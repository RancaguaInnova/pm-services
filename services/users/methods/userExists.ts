import { Errors } from "moleculer";
/**
 * Checks if an email has already been registered
 *
 * @param {object} service Reference to the Users service
 * @param {string} email
 * @returns {Promise<boolean>}
 */
const userExists = async (service, email: string): Promise<boolean> => {
  try {
    return await service.adapter.findOne({ "email.address": email }) ? true : false;
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

export default userExists;
