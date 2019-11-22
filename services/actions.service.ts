"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { actionsModel, actionsSettings } from "./actions/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

const ActionsService: ServiceSchema = {
  name: "actions",
  version: 1,

  mixins: [DBService, Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: actionsModel,

  /**
   * Service settings
   */
  settings: actionsSettings,
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

export = ActionsService;
