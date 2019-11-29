import includes from "lodash/includes";

/**
 * Get the authorization token from a request object
 *
 * @param {object} request Moleculer/Node request object
 * @returns {object} With the auth type as key, token as value
 */
export default (request: { headers: { authorization: string } }): { bearerToken: string } => {
  const { headers } = request;
  const auth = { bearerToken: null };
  if (headers && headers.authorization) {
    if (includes(headers.authorization, "bearer") || includes(headers.authorization, "Bearer")) {
      auth.bearerToken = headers.authorization.slice(7);
    }
  }
  return auth;
};
