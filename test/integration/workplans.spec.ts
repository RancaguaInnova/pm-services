"use strict";

import { Errors, ServiceBroker } from "moleculer";
import WorkPlansService from "../../services/workplans.service";

describe("Test 'WorkPlans' service", () => {
  const broker = new ServiceBroker();
  broker.createService(WorkPlansService);

  beforeAll(() => broker.start());
  afterAll(() => broker.stop());

  const testWorkplan = {
    id: 1,
    name: "Test Workplan",
    description: "Memory adapter test",
    initialDate: "2019-11-10",
    endDate: "2023-11-10",
  };

  it("CREATE action: Should return an object with the inserted WorkPlan", () => {
    return expect(broker.call("v1.workplans.create", testWorkplan)).resolves.toStrictEqual(
      testWorkplan,
    );
  });

  it("UPDATE action: should return with an object with the updated WorkPlan", () => {
    const updatedWP = Object.assign(testWorkplan, { name: "Updated Workplan" });
    return expect(
      broker.call("v1.workplans.update", { id: 1, ...updatedWP }),
    ).resolves.toStrictEqual(updatedWP);
  });

  it("GET action: Should return the document with the provided id", () => {
    return expect(broker.call("v1.workplans.get", { id: testWorkplan.id })).resolves.toStrictEqual(
      testWorkplan,
    );
  });

  it("LIST action: Should return with an array of WorkPlan documents", () => {
    return expect(broker.call("v1.workplans.list")).resolves.toStrictEqual({
      page: 1,
      pageSize: 10,
      rows: [testWorkplan],
      total: 1,
      totalPages: 1,
    });
  });

  it("DELETE action: Should return the deleted documents id", () => {
    return expect(
      broker.call("v1.workplans.remove", { id: testWorkplan.id }),
    ).resolves.toStrictEqual(testWorkplan.id);
  });
});
