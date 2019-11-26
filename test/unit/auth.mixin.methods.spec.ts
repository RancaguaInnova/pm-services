import authenticate from "../../mixins/auth/authenticate";
import getToken from "../../mixins/auth/getToken";

describe("Tests for authentication mixin methods", () => {
  const requestMock = {
    headers: {
      authorization: "Bearer some-hashed-long-token",
    },
  };

  describe("Tests getToken method:", () => {
    it("Should return an object containing a 'bearerToken' key and the token as value", () => {
      expect(getToken(requestMock)).toStrictEqual({ bearerToken: "some-hashed-long-token" });
    });

    it("Should return an object containing a 'bearerToken' key and null as value when no bearer token is provided", () => {
      expect(getToken({ headers: { authorization: "" } })).toStrictEqual({ bearerToken: null });
    });
  });

  // describe("Tests authenticate method:", () => {
  //   const mockedGetToken = jest.fn(getToken);
  //   const contextMock = {
  //     meta: {},
  //   };

  //   it("Should return resolved Promise with the null value", () => {
  //     expect(authenticate(contextMock, "", requestMock, {})).resolves.toStrictEqual(null);
  //   });
  // });
});
