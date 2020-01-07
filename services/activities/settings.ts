import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const activitySettings: ServiceSettingSchema = {
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
    "images",
    "documents",
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
    status: {
      type: "enum",
      values: ["not-started", "in-progress", "finished"],
      empty: false,
    },
    responsibleId: { type: "string", empty: false },
    executedFunds: {
      type: "array",
      items: {
        type: "object",
        props: {
          source: { type: "string", empty: false },
          amount: { type: "number", positive: true, integer: true },
        },
      },
    },
    coordinatedWith: { type: "array", items: "string" },
    beneficiaries: {
      type: "array",
      items: {
        type: "object",
        props: {
          description: { type: "string", empty: false },
          quantity: { type: "number", positive: true, integer: true },
        },
      },
    },
    location: {
      type: "object",
      optional: true,
      props: {
        name: { type: "string", empty: false },
        lat: { type: "number", positive: true, integer: true },
        lng: { type: "number", positive: true, integer: true },
      },
    },
    comments: { type: "string", optional: true },
    transversality: {
      type: "array",
      optional: true,
      items: {
        type: "object",
        props: {
          areaId: { type: "string", empty: false, optional: true },
          lineId: { type: "string", empty: false, optional: true },
          objectiveId: { type: "string", empty: false, optional: true },
          actionId: { type: "string", empty: false, optional: true },
        },
      },
    },
    approved: { type: "boolean", optional: true },
  },
};

const activitySchema = mongoose.Schema({
  name: { type: String, unique: true, empty: false },
  description: { type: String, empty: false },
  status: {
    type: String,
    enum: ["not-started", "in-progress", "finished"],
    default: "not-started",
    empty: false,
  },
  responsibleId: { type: String, empty: false },
  executedFunds: {
    type: [
      {
        source: { type: String, empty: false },
        amount: { type: String, empty: false },
      },
    ],
    empty: false,
  },
  coordinatedWith: { type: [String] },
  beneficiaries: [
    {
      description: { type: String, empty: false },
      quantity: { type: Number, positive: true, integer: true },
    },
  ],
  location: {
    type: [
      {
        name: { type: String, empty: false },
        lat: { type: Number, positive: true, integer: true },
        lng: { type: Number, positive: true, integer: true },
      },
    ],
    optional: true,
  },
  comments: { type: String, optional: true },
  transversality: {
    type: [
      {
        areaId: { type: String, empty: false, optional: true },
        lineId: { type: String, empty: false, optional: true },
        objectiveId: { type: String, empty: false, optional: true },
        actionId: { type: String, empty: false, optional: true },
      },
    ],
    optional: true,
  },
  approved: { type: Boolean, optional: true, default: false },
  createdBy: { type: String, optional: true },
  updatedBy: { type: String, optional: true },
});

const activityModel = mongoose.model("Activities", activitySchema);

export { activitySettings, activityModel };
