import { ServiceSchema } from "moleculer";
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
      exposedHeaders: [],
      // Configures the Access-Control-Allow-Credentials CORS header.
      credentials: true,
      // Configures the Access-Control-Max-Age CORS header.
      maxAge: 3600,
    },

		routes: [
			{
				path: "/api",
				whitelist: [
					// Access to any actions in all services under "/api" URL
					// "**",

					// AUTH
					"v1.auth.login",
					"v1.auth.logout",
					"v1.auth.resetPassword",

					// ROLES
					"v1.roles.list",
					"v1.roles.get",

					// WORKPLANS
					"v1.workplans.list",

					// USERS
					"v1.users.create",
					"v1.users.get",
					"v1.users.list",
					"v1.users.update",
					"v1.users.remove",

				],
				aliases: {
					// AUTH
          "POST /auth/login": "v1.auth.login",
          "POST /auth/logout": "v1.auth.logout",
					"GET /auth/reset": "v1.auth.resetPassword",

					// ROLES
					"GET /roles": "v1.roles.list",
					"GET /roles/:id": "v1.roles.get",

					// WORKPLANS
					"REST workplans": "v1.workplans",

					// USERS
					"REST users": "v1.users",
				},
				async onBeforeCall(context, route, request, response) {
					// this.logger.info("context:", context.service._serviceSpecification);
				},
			},
		],

		// Serve assets from "public" folder
		assets: {
			folder: "public",
		},
	},
};

export = ApiService;
