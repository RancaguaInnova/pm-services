import { ActionVisibility, Context, Errors } from "moleculer";

const visibility: ActionVisibility = "public";

/**
 * Find User by query object
 *
 * @param {Object} query MongoDB query object
 *
 * @returns {Object} User document
 */
export default {
  params: {},
  visibility,
  async handler(context: Context) {
    try {
      const baseRole = await this.adapter.findOne({ baseRole: true });
      return this.transformDocuments(context, {}, baseRole);
    } catch (error) {
      this.logger.error("Error finding basic role:", error.messsage);
      return Promise.reject(
        new Errors.MoleculerServerError(`Could not get basic role`, 500, "ServerError"),
      );
    }
  },
};
