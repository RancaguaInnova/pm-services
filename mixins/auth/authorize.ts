import { Context, Errors } from "moleculer";
import verifyToken from "./verifyToken";

/**
 * Verifies a token and extracts the user data from it if it's valid
 *
 * @export
 * @param {Context} context Moleculer Context type
 * @param {*} route
 * @param {*} request
 * @param {*} response
 * @returns
 */
export default function(context: Context, route, request, response) {
  try {
    context.meta.user = verifyToken(context.meta.bearerToken);
    this.logger.debug("ROUTE:", route);
    this.logger.debug("ACTION:", context.action.name);
    this.logger.debug("CHECK USER ROLE AND PERMISSIONS!");
    return Promise.resolve(null);
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerClientError("Invalid authorization token", 403, "Forbidden"),
    );
  }
}
