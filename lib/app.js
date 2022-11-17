import Koa from "koa";
import Knex from "knex";
import bodyParser from "koa-bodyparser";
import { Model } from "objection";
import knexConfig from "./configs/knex_config.js";
import login, { canRefreshToken } from "./auth/login_controller.js";
import register from "./auth/register_controller.js";
import logout from "./auth/logout_controller.js";
import jwt from "koa-jwt";
import Router from "koa-router";
import cors from "@koa/cors";

import course from "./courses/controller.js";
import fetchAnnouncements from "./annoucements/controller.js";
import { KEY, COOKIES } from "./configs/jwt_key.js";

const knex = Knex(knexConfig);
Model.knex(knex);
const app = new Koa();
const router = new Router({ prefix: "/api" });

app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 501;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

app.use(async function (ctx, next) {
  try {
    return await next();
  } catch (err) {
    if (401 == err.status) {
      // if (err.originalError) {
      //   if (err.originalError.name === "TokenExpiredError") {
      //     // Todo: Refersh Token
      //   }
      // } else {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
      // }
    } else {
      throw err;
    }
  }
});

app.use(
  jwt({
    secret: KEY,
    isRevoked: async function (_, d) {
      return (
        !(await canRefreshToken(d)) || d.exp < Math.floor(Date.now() / 1000)
      );
    },
    cookie: COOKIES,
  }).unless({
    path: ["/api/login", "/api/logout", "/api/register", "/api/announcements"],
  })
);

router.get("/annoucements", fetchAnnouncements);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all/courses", course.getAllCourse);
router.get("/my/courses", course.getUserCourses);
router.get("/course/:cid/quizes", course.getQuizzes);
router.get("/course/:cid/doquiz/:qid", course.getQuestions);
router.post("/course/:cid/doquiz/:qid", course.score);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "Hello world";
});
app.listen(3500);
export default app;
