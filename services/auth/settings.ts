import { ServiceSettingSchema } from "moleculer";

const authSettings: ServiceSettingSchema = {
  /*
    * Public fields
  */
  fields: ["_id", "email", "password", "token"],

  /*
    * Validation schema
  */
  entityValidator: {
    email: { type: "email", unique: true, empty: false },
    password: { type: "string", empty: false },
    token: { type: "string", optional: true },
  },
};

export default authSettings;
