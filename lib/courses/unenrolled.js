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
      .where(`${UserCourse.tableName}.cid`, `${Course.tableName}.id`)
  ).map((c) => c.cid);

  const data = cs.filter((c) => ecids.includes(c.cid));

  ctx.body = JSON.stringify(data);
};
