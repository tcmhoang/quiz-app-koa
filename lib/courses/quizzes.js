import Quiz from "../models/quizzes.js";
export default async (ctx) => {
  const { cid } = ctx.params;
  const data = await Quiz.query().where("cid", cid);
  ctx.body = JSON.stringify(data);
};
