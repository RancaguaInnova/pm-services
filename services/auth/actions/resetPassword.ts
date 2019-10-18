 import { Context, Errors } from "moleculer";

/** Reset the users password
 *
 * @param {String} email Users email
 *
 * @param {String} password Users password
 *
 * @returns {Boolean} True if the request succeded. Otherwise, returns MoleculerError
 */
 export default {
  params: {
    email: {
      type: "email",
    },
  },
  async handler(context: Context) {
    const { email } = context.params;
    try {
      let user = await context.call("v1.users.findByQuery", { query: { email } });
      if (!user) {
        return Promise.reject(
          new Errors.MoleculerClientError(
            `Error getting User`,
            404,
            "UserNotFound",
          ),
        );
      }
      const token = this.generateId() + this.generateId();

      user = await context.call("v1.users.updateForgotToken", { id: user._id, token } );
      await context.call("v1.notifications.sendEmail", { options: {
        to: [user.emails[0].address],
        subject: "Recupera tu contraseña",
        title: "Recupera tu contraseña",
        subtitle: "",
        body: `
          Para recuperar tu cuenta, haz click <a href="${process.env.SERVICE_URL}/auth/reset/${token}" target="_blank" style="color:#ff1148; text-decoration: none">aquí</a>
          <br/>
          <br/>
          <br/>
          Atentamente,<br/>
          <span style="display: inline-block; margin-left: 10px;"><strong style="color:#ff1148;">Equipo Rancagua Digital</strong></span>
        `,
      } });
      return true;
    } catch (error) {
      this.logger.error("Error recovering password:", error.message);
      return Promise.reject(error);
    }
  },
};
