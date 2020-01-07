"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { userModel, usersSettings } from "./users/settings";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";

// Actions:
import create from "./users/actions/create";
import findByQuery from "./users/actions/findByQuery";
import updateForgotToken from "./users/actions/updateForgotToken";

// Methods:
import generateEntity from "./users/methods/generateEntity";
import hashPassword from "./users/methods/hashPassword";
import insertUser from "./users/methods/insertUser";
import sendAccountValidationEmail from "./users/methods/sendAccountValidationEmail";
import userExists from "./users/methods/userExists";

const UsersService: ServiceSchema = {
  name: "users",
  version: 1,

  mixins: [DBService, Hooks],
  adapter: new MongooseAdapter(process.env.MONGO_URI),
  model: userModel,

  /**
   * Service settings
   */
  settings: usersSettings,

  /**
   * Service dependencies
   */
  dependencies: [],

  // hooks: {
  // 	before: {
  // 		list: ["checkIsAuthenticated", "checkUserRole"],
  // 		get: ["checkIsAuthenticated", "checkUserRole"],
  // 		update: ["checkIsAuthenticated", "checkUserRole"],
  // 		remove: ["checkIsAuthenticated", "checkUserRole"]
  // 	}

  // },
  /**
   * Actions
   */
  actions: {
    create,
    findByQuery,
    updateForgotToken,
  },

  /**
   * Events
   */
  events: {},

  /**
   * Service private methods
   */
  methods: {
    generateEntity,
    hashPassword,
    insertUser,
    sendAccountValidationEmail,
    userExists,
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
  // async stopped() {},
};

export = UsersService;
