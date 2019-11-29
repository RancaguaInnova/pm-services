import { Context, Errors } from "moleculer";
import verifyToken from "./verifyToken";
import has from "lodash/has";

/**
 * Verifies a token and extracts the user data from it if it's valid
 *
 * @export
 * @param {Context} context Moleculer Context type
 * @param {object} route
 * @param {object} request
 * @param {object} response
 * @returns Resolves to null if authorized, rejects with 403 error if unauthorized
 */
export default async function(
  context: Context,
  route,
  request: { $action: { name: string } },
  response,
) {
  try {
    context.meta.user = verifyToken(context.meta.bearerToken);
    const { role } = context.meta.user;
    const roleDetails = await context.call("v1.roles.get", { id: role });
    let [version, resource, action] = request.$action.name.split(".");

    // Maps DB actions (React-Admin terms) to Moleculero/REST terms
    const actionsMap = {
      update: "edit",
      get: "show",
      remove: "delete",
    };

    if (has(actionsMap, action)) action = actionsMap[action];
    // End map

    const canPerformAction = roleDetails[resource][action];

    if (!canPerformAction) {
      return Promise.reject(
        new Errors.MoleculerClientError(
          "You don't have the required permissions",
          403,
          "Forbidden",
        ),
      );
    }

    return Promise.resolve(null);
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerClientError("Invalid authorization token", 403, "Forbidden"),
    );
  }
}
