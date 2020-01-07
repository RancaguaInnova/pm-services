import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const authSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: ["id", "email", "identifier", "firstName", "lastName", "role", "services.authToken"],

  /*
   * Validation schema
   */
  entityValidator: {
    email: { type: "email", unique: true, empty: false },
    identifier: { type: "string", min: 8, unique: true },
    firstName: { type: "string", min: 3, optional: true },
    lastName: { type: "string", min: 3, optional: true },
    role: {
      type: "object",
      props: {
        id: { type: "string", empty: false },
        name: { type: "string", empty: false },
      },
    },
    createdAt: { type: "date" },
    updatedAt: { type: "date", optional: true },
  },
};

const authSchema = mongoose.Schema({
  email: { type: String, index: true },
  identifier: { type: String, min: 8, unique: true },
  firstName: { type: String, min: 3, optional: true },
  lastName: { type: String, min: 3, optional: true },
  role: {
    id: { type: String, empty: false },
    name: { type: String, empty: false },
  },
  createdAt: { type: Date, optional: true },
  updatedAt: { type: Date, optional: true },
});

const authModel = mongoose.model("Auth", authSchema);

export { authSettings, authModel };
