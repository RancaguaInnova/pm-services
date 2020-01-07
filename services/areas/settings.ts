import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const areasSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: ["id", "workplanId", "name", "description", "createdAt", "updatedAt"],

  /*
   * Validation schema
   */
  entityValidator: {
    name: { type: "string", empty: false },
    description: { type: "string", empty: false },
    workplanId: { type: "string", empty: false },
  },
};

const areaSchema = mongoose.Schema({
  name: { type: String, empty: false, index: true },
  description: { type: String, empty: false },
  workplanId: { type: String, empty: false },
});

const areaModel = mongoose.model("Areas", areaSchema);

export { areasSettings, areaModel };
