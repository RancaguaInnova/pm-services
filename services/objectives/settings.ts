import { ServiceSettingSchema } from "moleculer";

const linesSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "lineId",
    "name",
    "description",
    "createdAt",
    "updatedAt",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    lineId: { type: "string", empty: false },
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
  },
};

export default linesSettings;
