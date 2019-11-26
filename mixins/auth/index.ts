import authenticate from "./authenticate";
import authorize from "./authorize";

export default {
  name: "Auth Mixin",
  methods: {
    authenticate,
    authorize,
  },
};
