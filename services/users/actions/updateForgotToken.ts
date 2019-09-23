import { ActionVisibility, Errors } from "moleculer";

const visibility: ActionVisibility = "protected";

/**
 * Update Users password recovery token.
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
    id: { type: "string" },
    token: { type: "string" },
  },
  visibility,
  async handler(context) {
    const { id, token } = context.params;
    try {
      const updated = await this.adapter.updateById(id, { $set: { "services.forgot": token } });
      await this.addLogInfo(context, id);
      return updated;
    } catch (error) {
      this.logger.error("Error updating forgot token:", error.message);
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
