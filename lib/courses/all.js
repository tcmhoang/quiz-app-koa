import Course from "../models/courses.js";

export default async (ctx) => {
  const data = await Course.query();
  ctx.body = JSON.stringify(data);
};
