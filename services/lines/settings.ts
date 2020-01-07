import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const linesSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: ["id", "areaId", "name", "description", "responsibleId", "createdAt", "updatedAt"],

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

const lineSchema = mongoose.Schema({
  areaId: { type: String, empty: false },
  name: { type: String, index: true },
  description: { type: String },
  responsibleId: { type: String },
});

const lineModel = mongoose.model("Lines", lineSchema);

export { linesSettings, lineModel };
