import { ServiceSettingSchema } from "moleculer";

const workplansSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "name",
    "description",
    "initialDate",
    "endDate",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
    initialDate: { type: "date" },
    endDate: { type: "string" },
  },
};

export default workplansSettings;
