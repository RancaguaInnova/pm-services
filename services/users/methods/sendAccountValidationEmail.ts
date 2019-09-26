import { Errors } from "moleculer";

/**
 * Sends an email to validate the new Users account
 *
 * @param {*} context
 * @param {string} email
 * @param {string} token
 * @returns
 */
const sendAccountValidationEmail = async (context, email: string, token: string) => {
  try {
    context.call("v1.notifications.sendEmail", { options: {
      to: [email],
      subject: "Bienvenido a Rancagua-Digital",
      title: "Te damos la bienvenida!",
      subtitle: "Valida tu cuenta",
      body: `
        Para validar tu cuenta, haz click <a href="${process.env.SERVICE_URL}/auth/validate/${token}" target="_blank" style="color:#ff1148; text-decoration: none">aquí</a>
        <br/>
        <br/>
        <br/>
        Atentamente,<br/>
        <span style="display: inline-block; margin-left: 10px;"><strong style="color:#ff1148;">Equipo Rancagua Digital</strong></span>
      `,
    } });
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerServerError(
        `Notification error: ${error.message}`,
        500,
        "NotificationError",
      ),
    );
  }
};

export default sendAccountValidationEmail;
