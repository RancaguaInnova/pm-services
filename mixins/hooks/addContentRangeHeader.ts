import { Context } from "moleculer";

export default async (context: Context, response) => {
  context.meta.$responseHeaders = {
    "Content-Range": response.total,
  };
  return response;
};
