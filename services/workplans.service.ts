"use strict";
import { ServiceSchema } from "moleculer";
import DBService from "services-db-mixin";

const WorkPlansService: ServiceSchema = {
	name: "workplans",
	version: 1,

	mixins: [DBService(process.env.MONGO_URI, "workplans")],

	/**
	 * Service settings
	 */
	settings: {

	},

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
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

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
