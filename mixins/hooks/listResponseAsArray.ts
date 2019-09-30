import { Context } from "moleculer";

export default async (context: Context, response) => {
  return { data: response.rows };
};
