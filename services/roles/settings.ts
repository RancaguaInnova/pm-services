import { ServiceSettingSchema } from "moleculer";

const rolesSettings: ServiceSettingSchema = {
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
  ],

  /*
    * Validation schema
  */
  entityValidator: {
    name: { type: "string", unique: true, empty: false },
    workplans: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      read: { type: "boolean" },
      update: { type: "boolean" },
      delete: { type: "boolean" },
    } },
    areas: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      read: { type: "boolean" },
      update: { type: "boolean" },
      delete: { type: "boolean" },
    } },
    lines: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      read: { type: "boolean" },
      update: { type: "boolean" },
      delete: { type: "boolean" },
    } },
    objectives: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      read: { type: "boolean" },
      update: { type: "boolean" },
      delete: { type: "boolean" },
    } },
    actions: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      read: { type: "boolean" },
      update: { type: "boolean" },
      delete: { type: "boolean" },
    } },
    activities: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      read: { type: "boolean" },
      update: { type: "boolean" },
      delete: { type: "boolean" },
    } },
  },
};

export default rolesSettings;
