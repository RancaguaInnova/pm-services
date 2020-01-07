import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const departmentsSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: ["id", "name", "description", "managerId", "contactInformation"],

  /*
   * Validation schema
   */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    description: { type: "string", optional: true },
    managerId: { type: "string", optional: true },
    contactInformation: {
      type: "object",
      optional: true,
      props: {
        phone: { type: "string" },
        email: { type: "email" },
        address: { type: "string" },
      },
    },
  },
};

const departmentSchema = mongoose.Schema({
  name: { type: String, index: true, empty: false },
  description: { type: String, optional: true },
  managerId: { type: String, optional: true },
  contactInformation: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  },
});

const departmentModel = mongoose.model("Departments", departmentSchema);

export { departmentsSettings, departmentModel };
