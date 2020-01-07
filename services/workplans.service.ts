"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { workplanModel, workplansSettings } from "./workplans/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

const WorkPlansService: ServiceSchema = {
  name: "workplans",
  version: 1,

  mixins: [DBService, Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: workplanModel,

  /**
   * Service settings
   */
  settings: workplansSettings,

  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  // actions: {
  // 	list: context => Promise.resolve("ok!"),
  // },

  /**
   * Events
   */
  events: {},

  /**
   * Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   */
  // created() {},

  /**
   * Service started lifecycle event handler
   */
  // async started() {

  // },

  /**
   * Service stopped lifecycle event handler
   */
  // async stopped() {

  // },
};

export = WorkPlansService;
