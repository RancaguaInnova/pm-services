import { ActionVisibility, Context } from "moleculer";

const visibility: ActionVisibility = "protected";

/**
 * Verify users token
 *
 * @param {String} token Users token
 *
 * @return {Object} Token payload if valid
 */
export default {
  params: {
    token: { type: "string" },
  },
  visibility,
  async handler(context: Context) {
    try {
      return await this.verifyToken(context.params.token);
    } catch (error) {
      return error;
    }
  },
};
