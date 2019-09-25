"use strict";
import { ServiceSchema } from "moleculer";
import DbService from "services-db-mixin";

// SERVICE IMPORTS:
import settings from "./users/settings";

// MIXINS:
import AuthMethods from "../mixins/auth.mixin";

// Actions:
import create from "./users/actions/create";
import findByQuery from "./users/actions/findByQuery";
import updateForgotToken from "./users/actions/updateForgotToken";

// Methods:
import checkUser from "./users/methods/checkUser";
import hashPassword from "./users/methods/hashPassword";

const UsersService: ServiceSchema = {
	name: "users",
	version: 1,

	mixins: [
		DbService(process.env.MONGO_URI, "users"),
		AuthMethods,
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
