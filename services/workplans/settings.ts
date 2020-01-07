import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const workplansSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: ["id", "name", "description", "initialDate", "endDate"],

  /*
   * Validation schema
   */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", empty: false },
    initialDate: { type: "string" },
    endDate: { type: "string" },
  },
};

const workplanSchema = mongoose.Schema({
  name: { type: String, index: true, required: true },
  description: { type: String, required: true },
  initialDate: { type: String, required: true },
  endDate: { type: Date, required: true },
});

const workplanModel = mongoose.model("Workplans", workplanSchema);

export { workplansSettings, workplanModel };
