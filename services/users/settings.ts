import { ServiceSettingSchema } from "moleculer";

const usersSettings: ServiceSettingSchema = {
  idField: "id",

  /*
    * Public fields
  */
  fields: [
    "id",
    "email",
    "identifier",
    "firstName",
    "lastName",
    "role",
    "services.authToken",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    email: { type: "object", props: {
      address: { type: "email", min: 5, max: 64 },
      verified: { type: "boolean" },
    } },
    services: { type: "object", props: {
      password: { type: "object", props: {
        bcrypt: { type: "string" },
        createdAt: { type: "date" },
      } },
      authToken: { type: "string" },
      validationToken: { type: "string" },
      resetToken: { type: "string", optional: true },
    } },
    identifier: { type: "string", min: 8, unique: true },
    firstName: { type: "string", min: 3, optional: true },
    lastName: { type: "string", min: 3, optional: true },
    role: { type: "object", props: {
       id: { type: "string", empty: false },
       name: { type: "string", empty: false },
    } },
    createdAt: { type: "date" },
    updatedAt: { type: "date", optional: true },
  },
};

export default usersSettings;
