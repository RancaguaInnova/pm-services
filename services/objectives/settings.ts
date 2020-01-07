import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const objectivesSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: ["id", "lineId", "name", "description", "createdAt", "updatedAt"],

  /*
   * Validation schema
   */
  entityValidator: {
    lineId: { type: "string", empty: false },
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
  },
};

const objectiveSchema = mongoose.Schema({
  lineId: { type: String },
  name: { type: String, index: true },
  description: { type: String },
});

const objectiveModel = mongoose.model("Objectives", objectiveSchema);

export { objectivesSettings, objectiveModel };
