import Announcements from "../models/announcements.js";
export default async (ctx) => {
  const data = await Announcements.query();
  ctx.body = JSON.stringify(data);
};
