import { Context, Errors } from "moleculer";
import getToken from "./getToken";

/**
 * Check if the user is authenticated with a bearer token
 *
 * @export
 * @param {Context} context
 * @param {*} route
 * @param {*} request
 * @param {*} response
 * @returns Resolves a Promise to null if toke is found. Rejects with error otherwise
 */
export default function(context: Context, route, request, response) {
  const { bearerToken } = getToken(request);
  if (!bearerToken) {
    return Promise.reject(
      new Errors.MoleculerClientError("Debes iniciar sesión para acceder", 403, "Forbidden"),
    );
  }
  context.meta.bearerToken = bearerToken;
  return Promise.resolve(null);
}
