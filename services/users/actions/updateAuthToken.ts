import { ActionVisibility, Errors, Action } from "moleculer";

const visibility: ActionVisibility = "protected";

/**
 * Update Users token.
 * Protected action to be used from Auth service
 *
 * @param {String} id Users Id
 *
 * @param {String} token New token
 *
 * @returns {Object} User document
 */
export default {
  params: {
    id: { type: "string", optional: true },
    token: { type: "string", optional: true },
  },
  visibility,
  async handler(context) {

    const { id, token } = context.params;
    try {
      const updated = await this.adapter.updateById(id, { $set: { "services.authToken": token } });
      await this.addLogInfo(context, id);
      return updated;
    } catch (error) {
      this.logger.error("Error updating auth token:", error.message);
      return Promise.reject(
        new Errors.MoleculerServerError(
          `Could not update token: ${error.message}`,
          500,
          "InternalServerError",
        ),
      );
    }
  },
};
