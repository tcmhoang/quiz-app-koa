import User from "../models/user.js";

export default async (ctx) => {
  const b = ctx.request.body;
  const { username, password } = b;
  await User.query().insert({
    username: username,
    password: password,
  });
  ctx.body = { success: true };
};
