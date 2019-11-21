import { ServiceSettingSchema } from "moleculer";

const actionsSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "objectiveId",
    "name",
    "description",
    "responsibleId",
    "dependsOnIds",
    "status",
    "initialDate",
    "endDate",
    "weight",
    "images",
    "documents",
    "approved",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt",
   
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
    objectiveId: { type: "string", empty: false },
    responsibleId: { type: "string", empty: false },
    dependsOnIds: { type: "array", items: "string", optional: true },
    status: { type: "enum", values: [ "not-started", "in-progress", "finished" ] },
    initialDate: { type: "string" },
    endDate: { type: "string" },
    weight: { type: "number", integer: true, positive: true },
    approved: { type: "boolean", optional: true, default: false },
    createdBy: { type: "string", optional: true },
    updatedBy: { type: "string", optional: true },
  },
};

export default actionsSettings;
