import jwt from "jsonwebtoken";
import { Errors } from "moleculer";
import moment from "moment";

export default {
  name: "AuthMethods",
  methods: {
    updateAuthToken: async (service, id: string, email: string, role: string) => {
      try {
        // TODO: This is used at user login on Auth service. Maybe generalize it?
        const expiresAt = moment().add(3, "m");
        const authToken = jwt.sign({ id, email, role, expiresAt }, process.env.JWT_SECRET);
        return await service.adapter.updateById(id, { $set: { "services.authToken": authToken } });
      } catch (error) {
        service.logger.error("Error setting token on user", error.message);
        return Promise.reject(
          new Errors.MoleculerServerError(
            `Token update operation failed: ${error.message}`,
            500,
            "InsertFailed",
          ),
        );
      }
    },
  },
};
