import Router from "koa-router";
import jsonwebtoken from "jsonwebtoken";

export class LoginDetails {
  username;
  password;
}

const router = new Router();
router.post("/login", async (ctx) => {
  let b = ctx.request.body;
  if (b.username && b.password) {
    ctx.body = {
      token: jsonwebtoken.sign(
        {
          data: ctx.request.body,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        "blah"
      ),
    };
  }
});
export default router;
