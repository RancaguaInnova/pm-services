"use strict";

import { ServiceBroker } from "moleculer";
import UsersService from "../../services/users.service";

describe("Test 'Users' service", () => {
	const broker = new ServiceBroker();
	broker.createService(UsersService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'users.create' action", () => {
		it("should return the created User document", () => {
			const userData = {
				identifier: "14357896-9",
				email: "user@email.com",
				password: "safeandsecure",
			};

			expect(broker.call("v1.users.create", userData)).resolves.toBe("HELLO FAILURE");
		});
	});
});
