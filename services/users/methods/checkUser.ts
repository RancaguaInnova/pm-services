import * as moleculer from "moleculer";

/**
 * Checks if the User exists
 *
 * @param {Object} user User entity
 *
 * @returns {String} The hashed password
 */
const checkUser = (user) => {
  if (!user) {
    return Promise.reject(
      new moleculer.Errors.MoleculerClientError(
        `Could not get user: User not found`,
        404,
        "UserNotFound",
      ),
    );
  }
  return user;
};

export default checkUser;