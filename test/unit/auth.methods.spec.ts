import checkPasswords from "../../services/auth/methods/checkPasswords";
import { Errors } from "moleculer";
import hashPassword from "../../services/users/methods/hashPassword";

describe("Test checkPassword method", () => {
  const userMock = {
    services: {
      password: {
        bcrypt: hashPassword("real-password"),
      },
    },
  };

  it("Should return true when given password matches the hashed one", () => {
    expect(checkPasswords("real-password", userMock)).resolves.toStrictEqual(true);
  });

  it("Should throw an error when given password does not matche hashed one", () => {
    expect(checkPasswords("malicious-hacker-password", userMock)).rejects.toThrow(
      Errors.MoleculerServerError,
    );
  });
});
