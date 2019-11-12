import { Context } from "moleculer";

export default async (context: Context, response: { rows: object[] }) => {
  return response.rows;
};
