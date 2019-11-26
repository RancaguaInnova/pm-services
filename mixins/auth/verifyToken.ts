import jwt from "jsonwebtoken";

/**
 * Verify that the token is valid and return its payload
 *
 * @param {string} token Users bearer token
 *
 * @returns {object} Users data / token payload
 */
const verifyToken = (token: string): object => {
  return jwt.verify(token, process.env.JWT_SECRET, (error: object, payload) => {
    if (error) {
      return Promise.reject(error);
    }
    return payload;
  });
};

export default verifyToken;
