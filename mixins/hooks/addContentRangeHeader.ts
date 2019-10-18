import { Context } from "moleculer";

export default async (context: Context, response: { total: number }) => {
  context.meta.$responseHeaders = {
    "Content-Range": response.total,
  };
  return response;
};
