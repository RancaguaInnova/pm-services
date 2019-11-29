import authenticate from "./methods/authenticate";
import authorize from "./methods/authorize";

export default {
  name: "Auth Methods Mixin",
  methods: {
    authenticate,
    authorize,
  },
};
