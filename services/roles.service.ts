"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { roleModel, rolesSettings } from "./roles/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

// ACTION
import getBaseRole from "./roles/actions/getBaseRole";

const RolesService: ServiceSchema = {
  name: "roles",
  version: 1,

  mixins: [DBService, Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: roleModel,

  /**
   * Service settings
   */
  settings: rolesSettings,
  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {
    getBaseRole,
  },

  /**
   * Events
   */
  events: {},

  /**
   * Service private methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   */
  // created() {},

  /**
   * Service started lifecycle event handler
   */
  // async started() {},

  /**
   * Service stopped lifecycle event handler
   */
  // async stopped() {}
};

export = RolesService;
