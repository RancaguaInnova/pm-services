import { Context } from "moleculer";

export default async (context: Context, response) => {
  context.meta.$responseHeaders = {
    "X-Total-Count": response.total,
  };
  return response;
};
