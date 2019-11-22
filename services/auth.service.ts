"use strict";
import { ServiceSchema } from "moleculer";
import DbService from "services-db-mixin";
// import IdGenerator from "../../mixins/idGenerator.mixin";

// SERVICE IMPORTS:
import settings from "./auth/settings";

// Actions
import isTokenValid from "./auth/actions/isTokenValid";
import login from "./auth/actions/login";
import logout from "./auth/actions/logout";
import reset from "./auth/actions/reset";

// Methods
import checkPasswords from "./auth/methods/checkPasswords";
import hasVerifiedEmail from "./auth/methods/hasVerifiedEmail";
import verifyToken from "./auth/methods/verifyToken";

const AuthService: ServiceSchema = {
  name: "auth",
  version: 1,

  mixins: [DbService(process.env.MONGO_URI, "users")],

  /**
   * Service settings
   */
  settings,
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
    isTokenValid,
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
    verifyToken,
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
