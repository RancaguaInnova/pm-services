import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

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

    "approved",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
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
    status: {
      type: "enum",
      values: ["not-started", "in-progress", "finished"]
    },
    initialDate: { type: "string" },
    endDate: { type: "string" },
    weight: { type: "number", integer: true, positive: true },
    approved: { type: "boolean", optional: true, default: false },
    createdBy: { type: "string", optional: true },
    updatedBy: { type: "string", optional: true }
  }
};

const actionsSchema = mongoose.Schema({
  name: { type: String, unique: true, empty: false },
  description: { type: String, empty: false },
  objectiveId: { type: String, empty: false },
  responsibleId: { type: String, empty: false },
  dependsOnIds: { type: [String], optional: true },
  status: {
    type: String,
    enum: ["not-started", "in-progress", "finished"],
    default: "not-started"
  },
  initialDate: { type: String },
  endDate: { type: String },
  weight: { type: Number, integer: true, positive: true },
  approved: { type: Boolean, optional: true, default: false },
  createdBy: { type: String, optional: true },
  updatedBy: { type: String, optional: true }
});
actionsSchema.index({
  name: "text",
  description: "text",
  initialDate: "text",
  endDate: "text"
});

const actionsModel = mongoose.model("Actions", actionsSchema);

export { actionsSettings, actionsModel };
