import addXTotalCountHeader from "./addXTotalCountHeader";

export default {
  hooks: {
		after: {
			list: [
				addXTotalCountHeader,
			],
		},
  },
};
