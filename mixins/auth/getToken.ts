/**
 * Get the authorization token from a request object
 *
 * @param {object} request Moleculer/Node request object
 * @returns {object} With the auth type as key, token as value
 */
export default (request: { headers: { authorization: string } }) => {
  const { headers } = request;
  const auth = { bearerToken: null };
  if (headers && headers.authorization) {
    auth.bearerToken = headers.authorization.slice(7);
  }
  return auth;
};
