 import { Context, Errors } from "moleculer";
 import uuidv1 from "uuid/v1";

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
      const users = await context.call("v1.users.findByQuery", { query: { "email.address": email } });
      let user = users[0];
      if (!user) {
        return Promise.reject(
          new Errors.MoleculerClientError(
            `User was not found`,
            404,
            "UserNotFound",
          ),
        );
      }
      const token = uuidv1();

      user = await context.call("v1.users.updateForgotToken", { id: user.id, token } );
      await context.call("v1.notifications.sendEmail", { options: {
        to: [user.email.address],
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
