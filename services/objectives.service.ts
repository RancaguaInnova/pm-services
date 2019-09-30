"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "services-db-mixin";

// SERVICE IMPORTS:
import Hooks from "../mixins/hooks";
import settings from "./objectives/settings";

const ObjectivesService: ServiceSchema = {
	name: "objectives",
	version: 1,

	mixins: [
		DBService(process.env.MONGO_URI, "objectives"),
		Hooks,
	],

	/**
	 * Service settings
	 */
	settings,
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

export = ObjectivesService;
