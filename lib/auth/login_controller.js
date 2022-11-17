import jsonwebtoken from "jsonwebtoken";
import User from "../models/users.js";
import { KEY, COOKIES } from "../configs/jwt_key.js";
import { getUserId } from "../utils/users_services.js";

async function canRefreshToken(decoded) {
  const { id, refreshToken } = decoded;
  let token = await User.query().where("id", id).select("rtoken").first();
  token = token ? token.rtoken : null;
  return refreshToken && token && token == refreshToken;
}

export default async (ctx) => {
  const b = ctx.request.body;
  const { username, password } = b;
  const id = await getUserId(username, password);
  if (id != -1) {
    const rtoken = Math.random().toString().substring(2, 8);
    await User.query().findById(id).patch({ rtoken: rtoken });
    const token = jsonwebtoken.sign(
      {
        id: id,
        data: b,
        refreshToken: rtoken,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      KEY
    );
    ctx.body = {
      token: token,
    };
    ctx.cookies.set(COOKIES, token);
  }
};

export { canRefreshToken };
