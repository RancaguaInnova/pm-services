"use strict";
import { ServiceSchema } from "moleculer";
// import IdGenerator from "../../mixins/idGenerator.mixin";

// SERVICE IMPORTS:
import settings from "./roles/settings";

const RolesService: ServiceSchema = {
	name: "roles",
	version: 1,

	mixins: [],

	/**
	 * Service settings
	 */
	settings,
	/**
	 * Service dependencies
	 */
	dependencies: [{ name: "auth", version: 1 }],

	/**
	 * Actions
	 */
	// actions: {},

	/**
	 * Events
	 */
	events: {

	},

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

export = RolesService;
