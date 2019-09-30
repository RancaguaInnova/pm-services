import addContentRangeHeader from "./addContentRangeHeader";
import listResponseAsArray from "./listResponseAsArray";

export default {
  hooks: {
		after: {
			list: [
				addContentRangeHeader,
				listResponseAsArray,
			],
		},
  },
};
