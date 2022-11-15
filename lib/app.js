import Koa from "koa";
import Knex from "knex";
import bodyParser from "koa-bodyparser";
import { Model } from "objection";
import knexConfig from "./configs/knex_config.js";
import userController from "./login/controller.js";
import jwt from "koa-jwt";
import cors from "@koa/cors";

const knex = Knex(knexConfig);
Model.knex(knex);
const app = new Koa();
app.use(bodyParser());
app.use(cors());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});
app.use(
  jwt({
    secret: "blah",
  }).unless({
    path: ["/login"],
  })
);
app.use(userController.routes());
app.use(userController.allowedMethods());
app.use(async (ctx) => {
  ctx.body = "Hello world";
});
app.listen(3500);
export default app;
