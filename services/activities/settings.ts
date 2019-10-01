import { ServiceSettingSchema } from "moleculer";

const activitiesSettings: ServiceSettingSchema = {
  idField: "id",
  /*
    * Public fields
  */
  fields: [
    "id",
    "actionId",
    "name",
    "description",
    "status",
    "responsibleId",
    "executedFunds",
    "coordinatedWith",
    "beneficiaries",
    "location",
    "comments",
    "transversality",
    "approved",
    "createdAt",
    "updatedAt",
    "completedAt",
    "completedBy",
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    actionId: { type: "string", empty: false },
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
    status: { type: "enum", values: [ "not-started", "in-progress", "finished" ], empty: false },
    responsibleId: { type: "string", empty: false },
    executedFunds: { type: "array", items: { type: "object", props: {
      source: { type: "string", empty: false },
      amount: { type: "number", positive: true, integer: true },
    } } },
    coordinatedWith: { type: "array", items: "string" },
    beneficiaries: { type: "array", items: { type: "object", props: {
      description: { type: "string", empty: false },
      quantity: { type: "number", positive: true, integer: true },
    } } },
    location: { type: "object", props: {
      name: { type: "string", empty: false },
      lat: { type: "number", positive: true, integer: true },
      lng: { type: "number", positive: true, integer: true },
    } },
    comments: { type: "string", optional: true },
    transversality: { type: "array", optional: true, items: { type: "object", props: {
      areaId: { type: "string", empty: false },
      lineId: { type: "string", empty: false },
      objectiveId: { type: "string", empty: false },
      actionId: { type: "string", empty: false },
    } } },
  },
  approved: { type: "boolean" },
};

export default activitiesSettings;
