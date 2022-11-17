import jsonwebtoken from "jsonwebtoken";
import User from "../models/users.js";
import { KEY, COOKIES } from "../configs/jwt_key.js";

const getUser = async (ctx) => {
  const token =
    ctx.request.header["authorization"].split(" ").at(1) ||
    ctx.cookies.get(COOKIES);
  let tmp;
  jsonwebtoken.verify(token, KEY, (error, decoded) => {
    tmp = { error, decoded };
  });
  if (!tmp.error) {
    const { username, password } = tmp.decoded.data;
    const { id } = tmp.decoded;
    const rid = await getUserId(username, password);
    if (id == rid) {
      return { username, password, id };
    }
  }
  throw tmp.error;
};

async function getUserId(username, password) {
  if (username && password) {
    const user = await User.query()
      .where({ username: username, password: password })
      .select("id")
      .first();
    return user ? user.id : -1;
  }

  return -1;
}

export { getUser, getUserId };
