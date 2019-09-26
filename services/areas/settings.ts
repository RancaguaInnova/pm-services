import { ServiceSettingSchema } from "moleculer";

const areasSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "workplanId",
    "name",
    "description",
    "createdAt",
    "updatedAt",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
    workplanId: { type: "string", empty: false },
  },
};

export default areasSettings;
