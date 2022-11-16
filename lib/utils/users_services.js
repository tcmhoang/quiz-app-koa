import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
import KEY from "../configs/jwt_key.js";

const getUser = async (ctx) => {
  const token = ctx.request.header["authorization"].split(" ").at(1);

  jsonwebtoken.verify(token, KEY, async (error, decoded) => {
    if (!error) {
      const { username, password } = decoded.data;
      const { id } = decoded;
      const rid = await getUserId(username, password);
      if (id == rid) {
        return { username, password, id };
      }
    }
    throw error;
  });
  return {};
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
