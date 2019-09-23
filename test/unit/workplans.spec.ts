"use strict";

import { Errors, ServiceBroker } from "moleculer";
import WorkPlansService from "../../services/workplans.service";

describe("Test 'WorkPlans' service", () => {
	const broker = new ServiceBroker();
	broker.createService(WorkPlansService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'workplans.list' action", () => {

		it("should return with an array of WorkPlan documents", () => {
			expect(broker.call("v1.workplans.list")).resolves.toBe([]);
		});

	});
});
