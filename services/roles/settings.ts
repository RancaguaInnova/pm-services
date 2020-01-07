import { ServiceSettingSchema } from "moleculer";
import mongoose from "mongoose";

const validatorObject = {
  type: "object",
  empty: false,
  props: {
    create: { type: "boolean" },
    show: { type: "boolean" },
    edit: { type: "boolean" },
    delete: { type: "boolean" },
    list: { type: "boolean" },
    enabled: { type: "boolean" },
  },
};

const rolesSettings: ServiceSettingSchema = {
  idField: "id",
  /*
   * Public fields
   */
  fields: [
    "id",
    "name",
    "workplans",
    "areas",
    "lines",
    "objectives",
    "actions",
    "activities",
    "users",
    "departments",
    "roles",
  ],

  /*
   * Validation schema
   */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    workplans: validatorObject,
    areas: validatorObject,
    lines: validatorObject,
    objectives: validatorObject,
    actions: validatorObject,
    activities: validatorObject,
    users: validatorObject,
    departments: validatorObject,
    roles: validatorObject,
  },
};

const schemaSettings = {
  create: { type: Boolean },
  show: { type: Boolean },
  edit: { type: Boolean },
  delete: { type: Boolean },
  list: { type: Boolean },
  enabled: { type: Boolean },
};

const roleSchema = mongoose.Schema({
  name: { type: String, index: true },
  workplans: schemaSettings,
  areas: schemaSettings,
  lines: schemaSettings,
  objectives: schemaSettings,
  actions: schemaSettings,
  activities: schemaSettings,
  users: schemaSettings,
  departments: schemaSettings,
  roles: schemaSettings,
});

const roleModel = mongoose.model("Roles", roleSchema);

export { rolesSettings, roleModel };
