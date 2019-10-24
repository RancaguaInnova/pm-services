import { Context, Errors, ServiceSchema } from "moleculer";
import ApiGateway from "moleculer-web";

const ApiService: ServiceSchema = {
	name: "api",
	version: 1,
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3200,
		cors: {
      // Configures the Access-Control-Allow-Origin CORS header.
      origin: "*",
      // Configures the Access-Control-Allow-Methods CORS header.
      methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
      // Configures the Access-Control-Allow-Headers CORS header.
      allowedHeaders: ["Content-Type", "Authorization", "X-Origin"],
      // Configures the Access-Control-Expose-Headers CORS header.
      exposedHeaders: ["Content-Range"],
      // Configures the Access-Control-Allow-Credentials CORS header.
      credentials: true,
      // Configures the Access-Control-Max-Age CORS header.
      maxAge: 3600,
    },

		routes: [
			// {
			// 	path: "/api",
			// 	authorization: true,
			// 	whitelist: [
			// 		"v1.auth.resetPassword",
			// 	],
			// 	aliases: {
			// 		"GET /auth/reset": "v1.auth.resetPassword",
			// 	},
			// },
			{
				path: "/api",
				whitelist: [
					// Access to any actions in all services under "/api" URL
					// "**",

					// AUTH
					"v1.auth.login",
					"v1.auth.logout",
					// "v1.auth.resetPassword",

					// ACTIONS
					"v1.actions.create",
					"v1.actions.get",
					"v1.actions.list",
					"v1.actions.update",
					"v1.actions.remove",

					// ACTIVITIES
					"v1.activities.create",
					"v1.activities.get",
					"v1.activities.list",
					"v1.activities.update",
					"v1.activities.remove",

					// AREAS
					"v1.areas.create",
					"v1.areas.get",
					"v1.areas.list",
					"v1.areas.update",
					"v1.areas.remove",

					// DEPARTMENTS
					"v1.departments.create",
					"v1.departments.get",
					"v1.departments.list",
					"v1.departments.update",
					"v1.departments.remove",

					// LINES
					"v1.lines.create",
					"v1.lines.get",
					"v1.lines.list",
					"v1.lines.update",
					"v1.lines.remove",

					// OBJECTIVES
					"v1.objectives.create",
					"v1.objectives.get",
					"v1.objectives.list",
					"v1.objectives.update",
					"v1.objectives.remove",

					// ROLES
					"v1.roles.create",
					"v1.roles.get",
					"v1.roles.list",
					"v1.roles.update",
					"v1.roles.remove",

					// USERS
					"v1.users.create",
					"v1.users.get",
					"v1.users.list",
					"v1.users.update",
					"v1.users.remove",

					// WORKPLANS
					"v1.workplans.list",
					"v1.workplans.create",
					"v1.workplans.get",
					"v1.workplans.update",
					"v1.workplans.remove",

				],
				aliases: {
					// AUTH
          "POST /auth/login": "v1.auth.login",
          "POST /auth/logout": "v1.auth.logout",
					// "GET /auth/reset": "v1.auth.resetPassword",

					// ACTIONS
					"REST actions": "v1.actions",

					// ACTIVITIES
					"REST activities": "v1.activities",

					// AREAS
					"REST areas": "v1.areas",

					// DEPARTMENTS
					"REST departments": "v1.departments",

					// LINES
					"REST lines": "v1.lines",

					// OBJECTIVES
					"REST objectives": "v1.objectives",

					// ROLES
					"GET /roles": "v1.roles.list",
					"GET /roles/:id": "v1.roles.get",

					// WORKPLANS
					"REST workplans": "v1.workplans",

					// USERS
					"REST users": "v1.users",
				},
				async onBeforeCall(context: Context, route, request, response) {
					// this.logger.info("context:", context.service._serviceSpecification);
				},
			},
		],

		// Serve assets from "public" folder
		assets: {
			folder: "public",
		},
	},
	methods: {
		authenticate(context: Context, route, request, response) {
			const token = this.getToken(request);
			if (!token.bearerToken) {
				return Promise.reject(
					new Errors.MoleculerClientError(
						"Debes iniciar sesión para acceder",
						403,
						"Forbidden",
					),
				);
			}
			context.meta = { ...context.meta, token };
			return Promise.resolve(null);
		},
		authorize(context: Context, route, request, response) {
			const token: string = context.meta.token.bearerToken;
			context.meta.user = this.getDataFromToken(context, token);
		},
	},
};

// TODO: TEST AUTHENTICATION / AUTHORIZATION

export = ApiService;
