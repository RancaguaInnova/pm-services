// import addContentRangeHeader from "./addContentRangeHeader";
import listResponseAsArray from "./listResponseAsArray";

export default {
  name: "request-hooks",
  hooks: {
    after: {
      list: [
        // addContentRangeHeader,
        listResponseAsArray,
      ],
    },
  },
};
