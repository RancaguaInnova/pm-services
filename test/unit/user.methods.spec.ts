import checkPasswords from "../../services/auth/methods/checkPasswords";
import { Errors } from "moleculer";
import hashPassword from "../../services/users/methods/hashPassword";
import jwt from "jsonwebtoken";
import moment from "moment";
import { ServiceBroker } from "moleculer";
import UsersService from "../../services/users.service";
import uuid from "uuid";
import generateEntity from "../../services/users/methods/generateEntity";

describe("Test generateEntity method", () => {
  const broker = new ServiceBroker();
  const service = broker.createService(UsersService);

  beforeAll(() => broker.start());
  afterAll(() => broker.stop());

  const basicUserData = {
    identifier: "1234567-8",
    email: {
      address: "test-email@provider.mail",
    },
    password: "safe-and-secure-password",
  };

  const userMock = {
    _id: 1,
    identifier: basicUserData.identifier,
    email: {
      address: basicUserData.email.address,
      verified: false,
    },
    role: {
      id: "some-role-id",
      name: "Role Name",
    },
    createdAt: new Date(),
    services: {
      password: {
        bcrypt: hashPassword(basicUserData.password),
        createdAt: new Date(),
      },
      authToken: jwt.sign(
        {
          id: 1,
          email: basicUserData.email.address,
          role: "some-role-id",
          expiresAt: moment().add(3, "m"),
        },
        "really-long-and-complicated-secret",
      ),
      validationToken: uuid.v1(),
    },
  };

  it("Should return an object representing a new User document", () => {
    const { identifier, email, password } = basicUserData;
    expect(generateEntity(service, identifier, email.address, password)).toStrictEqual(userMock);
  });
});
