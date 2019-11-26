"use strict";

import { ServiceBroker } from "moleculer";
import UsersService from "../../services/users.service";

describe("Test 'Users' service", () => {
  const broker = new ServiceBroker();
  broker.createService(UsersService);

  beforeAll(() => broker.start());
  afterAll(() => broker.stop());

  const userMock = {
    id: 1,
    identifier: "14357896-9",
    email: "user@email.com",
    password: "safeandsecure",
  };

  it("Create action: Should return the inserted User document", () => {
    return expect(broker.call("v1.users.create", userMock)).resolves.toStrictEqual(userMock);
  });
});
