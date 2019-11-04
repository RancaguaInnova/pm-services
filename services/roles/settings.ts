import { ServiceSettingSchema } from "moleculer";

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
    workplans: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    areas: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    lines: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    objectives: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    actions: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    activities: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    users: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    departments: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
    roles: { type: "object", empty: false, props: {
      create: { type: "boolean" },
      show: { type: "boolean" },
      edit: { type: "boolean" },
      delete: { type: "boolean" },
      list: { type: "boolean" },
      enable: { type: "boolean" },
    } },
  },
};

export default rolesSettings;
