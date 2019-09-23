"use strict";
import { ServiceSchema } from "moleculer";
// import IdGenerator from "../../mixins/idGenerator.mixin";

// SERVICE IMPORTS:
import settings from "./auth/settings";

// Actions
import isTokenValid from "./auth/actions/isTokenValid";
import login from "./auth/actions/login";
import logout from "./auth/actions/logout";
import resetPassword from "./auth/actions/resetPassword";

// Methods
import checkPasswords from "./auth/methods/checkPasswords";
import hasVerifiedEmail from "./auth/methods/hasVerifiedEmail";
import verifyToken from "./auth/methods/verifyToken";

const AuthService: ServiceSchema = {
	name: "auth",
	version: 1,

	mixins: [
		// IdGenerator,
	],

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
		resetPassword,
		isTokenValid,
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
		verifyToken,
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
