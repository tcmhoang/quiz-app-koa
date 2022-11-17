import UserCourse from "../models/users_courses.js";
import Course from "../models/courses.js";
import { getUser } from "../utils/users_services.js";
import errorHandle from "../utils/error_hander.js";
export default async (ctx) => {
  await errorHandle(ctx, async () => {
    const { id } = await getUser(ctx);
    const data = await Course.query()
      .joinRelated(UserCourse.tableName)
      .where(`${UserCourse.tableName}.uid`, id);
    ctx.body = JSON.stringify(data);
  });
};
