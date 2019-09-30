import { Context } from "moleculer";

export default async (context: Context, response: { rows: any; }) => {
  return response.rows;
};
