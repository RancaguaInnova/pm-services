/**
 * Log a User out
 *
 * @return {null}
 */
export default {
  async handler(context) {
    const token = context.meta.bearerToken;
    try {
      const { id } = await this.verifyToken(token);
      await context.call("v1.users.updateToken", { id, token: null });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
