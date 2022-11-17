import User from "../models/users.js";

export default async (ctx) => {
  const b = ctx.request.body;
  const { username, password } = b;
  await User.query().insert({
    username: username,
    password: password,
  });
  ctx.body = { success: true };
};
