import jwt from "jsonwebtoken";

/**
 * Verify that the token is valid and return its payload
 *
 * @param {String} token Users bearer token
 *
 * @returns {Object} Users data / token payload
 */
const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET, (error: object, payload) => {
		if (error) {
			return Promise.reject(error);
		}
		return payload;
	});
};

export default verifyToken;
