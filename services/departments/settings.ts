import { ServiceSettingSchema } from "moleculer";

const departmentsSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "name",
    "description",
    "managerId",
    "contactInformation",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", optional: true },
    managerId: { type: "string", optional: true },
    contactInformation: { type: "object", optional: true, props: {
      phone: { type: "string" },
      email: { type: "email" },
      address: { type: "string" },
    }},
  },
};

export default departmentsSettings;
