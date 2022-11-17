import Quiz from "../models/quizzes.js";
import Question from "../models/questions.js";
import Answer from "../models/answers.js";

const getQuestions = async (ctx) => {
  const { cid, qid } = ctx.params;
  if (await checkQuizId(cid, qid)) {
    const qs = await Question.query().where("qid", qid);
    let data = new Map();
    qs.foreach(async (q) => {
      data[q] = (await Answer.query().where("qid", q.id)).map((a) => {
        a.id, a.desc;
      });
    });
    ctx.body = JSON.stringify(data);
  } else {
    ctx.status = 409;
    ctx.body = { data: null };
  }
};

const score = async (ctx) => {
  const { cid } = ctx.params;
  const Qid = ctx.params.qid;

  const { data } = ctx.request.body;
  if (await checkQuizId(cid, Qid)) {
    const res = data
      .map(async ({ aid, qid }) => {
        return (await checkQuestionId(qid, Qid)) &&
          (await checkAnswerId(aid, qid)) &&
          (await (async () => {
            const { correct } = await Answer.query().findById(aid).first();
            return correct;
          })())
          ? 1
          : 0;
      })
      .reduce((pre, curr) => pre + curr);
    ctx.body = res;
  } else {
    ctx.status = 409;
    ctx.body = { data: null };
  }
};

const checkQuizId = async (id, courseid) => {
  const { cid } = await Quiz.query().findById(id).first();
  return courseid == cid;
};

const checkQuestionId = async (id, Qid) => {
  const { qid } = await Question.query().findById(id).first();
  return Qid == qid;
};

const checkAnswerId = async (id, Qid) => {
  const { qid } = await Answer.query().findById(id).first();
  return Qid == qid;
};

export { getQuestions, score };
