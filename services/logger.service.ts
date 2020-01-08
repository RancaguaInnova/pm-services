"use strict";
import { ServiceSchema } from "moleculer";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import DBService from "services-db-mixin";
import Hooks from "../mixins/hooks";

// SERVICE IMPORTS:
import { loggerModel, loggerSettings } from "./logger/settings";

const LoggerService: ServiceSchema = {
  name: "logger",
  version: 1,
  mixins: [DBService("", "logs"), Hooks],
  dapter: new MongooseAdapter(process.env.MONGO_URI),
  model: loggerModel,

  /**
   * Service settings
   */
  settings: loggerSettings,

  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  // actions: {
  // create,
  // get,
  // },

  /**
   * Events
   */
  events: {},

  /**
   * Service private methods
   */
  methods: {},
};

export = LoggerService;
