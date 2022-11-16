import User from "../models/user.js";
import { getUser } from "../utils/users_services.js";
import handleError from "../utils/error_hander.js";

export default async (ctx) => {
  return handleError(ctx, async () => {
    const { id } = await getUser(ctx);
    if (id) {
      await User.query().patchAndFetchById(id, { rtoken: null });
      ctx.body = { success: true };
    }
  });
};
