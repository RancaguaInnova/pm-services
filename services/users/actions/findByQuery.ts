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
  params: {
    query: { type: "object" },
  },
  visibility,
  async handler(context: Context) {
    const { query } = context.params;
    try {
      const users = await this.adapter.find({ query });
      return await this.transformDocuments(context, {}, users);

    } catch (error) {
      this.logger.error("Error finding user by query:", error.messsage);
      return Promise.reject(
        new Errors.MoleculerClientError(
          `Could not get user with query: ${query}`,
          404,
          "UserNotFound",
        ),
      );
    }
  },
};
