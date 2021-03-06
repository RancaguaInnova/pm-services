"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { lineModel, linesSettings } from "./lines/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

const LinesService: ServiceSchema = {
  name: "lines",
  version: 1,

  mixins: [DBService, Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: lineModel,

  /**
   * Service settings
   */
  settings: linesSettings,
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

export = LinesService;
