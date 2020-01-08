"use strict";
import { ServiceSchema } from "moleculer";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import DBService from "services-db-mixin";
import { activityModel, activitySettings } from "./activities/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

const ActivitiesService: ServiceSchema = {
  name: "activities",
  version: 1,

  mixins: [DBService("", "activities", { version: 1, name: "logger", action: "create" }), Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: activityModel,

  /**
   * Service settings
   */
  settings: activitySettings,
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

export = ActivitiesService;
