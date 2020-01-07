"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { areaModel, areasSettings } from "./areas/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

const AreasService: ServiceSchema = {
  name: "areas",
  version: 1,

  mixins: [DBService, Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: areaModel,

  /**
   * Service settings
   */
  settings: areasSettings,
  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  // actions: {},

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

export = AreasService;
