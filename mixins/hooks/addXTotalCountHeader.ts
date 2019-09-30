import { Context } from "moleculer";

export default async (context: Context, response) => {
  context.meta.$responseHeaders = {
    "x-total-count": response.total,
  };
  return response;
};
