import addXTotalCountHeader from "./addXTotalCountHeader";
import listResponseAsArray from "./listResponseAsArray";

export default {
  hooks: {
		after: {
			list: [
				addXTotalCountHeader,
				listResponseAsArray,
			],
		},
  },
};
