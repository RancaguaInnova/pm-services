import { Context, Errors } from "moleculer";

/**
 *
 *
 * @param {*} context
 * @param {*} tokenObj
 * @returns
 */
export default async (context: Context, token: string ) => {
  try {
    return await context.call("v1.auth.isTokenValid", { token });
  } catch (error) {
    this.logger.error("Error validating token:", error);
    return Promise.reject(
      new Errors.MoleculerClientError(
        "Token de autorizacion invalido",
        403,
        "Forbidden",
      ),
    );
  }
};
