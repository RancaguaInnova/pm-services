import { ServiceSettingSchema } from "moleculer";

const linesSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "areaId",
    "name",
    "description",
    "responsibleId",
    "createdAt",
    "updatedAt",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    areaId: { type: "string", empty: false },
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
    responsibleId: { type: "string", empty: false },
  },
};

export default linesSettings;
