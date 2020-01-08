import mongoose from "mongoose";

const loggerSettings = {
  /*
   * Transforms MongoDB _id field to this one
   */
  idField: "id",

  /*
   * Public fields
   */
  fields: ["id", "userId", "date", "entityId", "resource", "action", "origin"],

  /*
   * Validation schema
   */
  entityValidator: {
    userId: { type: "string", optional: true },
    date: { type: "date", empty: false },
    entityId: { type: "string", optional: true },
    resource: { type: "string", empty: false },
    action: { type: "enum", values: ["create", "update", "remove"], empty: false },
    origin: { type: "enum", values: ["backoffice", "app", "webviews"] },
  },
};

const loggerSchema = mongoose.Schema({
  userId: { type: String },
  date: { type: Date, required: true },
  entityId: { type: String },
  resource: { type: String, required: true },
  action: { type: String, enum: ["create", "update", "remove"], required: true },
  origin: { type: String, enum: ["backoffice", "app", "webviews"] },
});

const loggerModel = mongoose.model("Logger", loggerSchema);

export { loggerSettings, loggerModel };
