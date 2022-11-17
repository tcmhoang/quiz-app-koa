import Course from "../models/courses.js";
import UserCourse from "../models/users_courses.js";
import { getUser } from "../utils/users_services.js";

export default async (ctx) => {
  const cs = await Course.query();
  const { id } = await getUser(ctx);

  const ecids = (
    await Course.query()
      .joinRelated(UserCourse.tableName)
      .where(`${UserCourse.tableName}.uid`, id)
  ).map((c) => c.id);

  const data = cs.filter((c) => !ecids.includes(c.id));

  ctx.body = JSON.stringify(data);
};
