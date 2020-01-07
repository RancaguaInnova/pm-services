"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { authModel, authSettings } from "./auth/settings";

// Actions
import login from "./auth/actions/login";
import logout from "./auth/actions/logout";
import reset from "./auth/actions/reset";

// Methods
import checkPasswords from "./auth/methods/checkPasswords";
import hasVerifiedEmail from "./auth/methods/hasVerifiedEmail";

const AuthService: ServiceSchema = {
  name: "auth",
  version: 1,

  mixins: [DBService],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: authModel,

  /**
   * Service settings
   */
  settings: authSettings,
  /**
   * Service dependencies
   */
  dependencies: [{ name: "users", version: 1 }],

  /**
   * Actions
   */
  actions: {
    login,
    logout,
    reset,
  },

  /**
   * Events
   */
  events: {},

  /**
   * Service private methods
   */
  methods: {
    checkPasswords,
    hasVerifiedEmail,
  },

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

export = AuthService;
