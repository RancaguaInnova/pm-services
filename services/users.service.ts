"use strict";
import { ServiceSchema } from "moleculer";
import DbService from "services-db-mixin";
// const Auth = require("services-auth-mixin");

// SERVICE IMPORTS:
import settings from "./users/settings";

// Actions:
import create from "./users/actions/create";
// const list = require("./actions/list");
// const get = require("./actions/get");
// const update = require("./actions/update");
// const remove = require("./actions/remove");
import findByQuery from "./users/actions/findByQuery";
import updateAuthToken from "./users/actions/updateAuthToken";
import updateForgotToken from "./users/actions/updateForgotToken";

// Methods:
import checkUser from "./users/methods/checkUser";
import hashPassword from "./users/methods/hashPassword";

const UsersService: ServiceSchema = {
	name: "users",
	version: 1,

	mixins: [
		DbService(process.env.MONGO_URI, "users"),
		// Auth,
	],

	/**
	 * Service settings
	 */
	settings,

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
		// list,
		// get,
		findByQuery,
		// update,
		updateAuthToken,
		updateForgotToken,
		// remove,
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Service private methods
	 */
	methods: {
		checkUser,
		hashPassword,
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};

export = UsersService;
