import { ServiceSettingSchema } from "moleculer";

const authSettings: ServiceSettingSchema = {
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
    email: { type: "email", unique: true, empty: false },
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

export default authSettings;
