import Quiz from "../models/quizzes.js";
import Question from "../models/questions.js";
import Answer from "../models/answers.js";

const getQuestions = async (ctx) => {
  const { cid, qid } = ctx.params;
  if (await checkQuizId(cid, qid)) {
    const qs = await Question.query().where("qid", qid);
    const data = new Map();
    for (const q of qs) {
      const tmp = (await Answer.query().where("qid", q.id)).map((a) => {
        return { id: a.id, desc: a.desc };
      });
      data.set(q, tmp);
    }
    ctx.body = JSON.stringify({ data: [...data.entries()] });
  } else {
    ctx.status = 409;
    ctx.body = { data: null };
  }
};

const score = async (ctx) => {
  const { cid } = ctx.params;
  const Qid = ctx.params.qid;

  const { data } = ctx.request.body;
  const parsedData = JSON.parse(data);

  if (await checkQuizId(cid, Qid)) {
    let acc = 0;
    for (const e of parsedData) {
      const { aid, qid } = e;
      if (
        (await checkQuestionId(qid, Qid)) &&
        (await checkAnswerId(aid, qid)) &&
        (await (async () => {
          const { correct } = await Answer.query().findById(aid).first();
          return correct;
        })())
      )
        acc++;
    }

    ctx.body = JSON.stringify({ res: acc });
  } else {
    ctx.status = 409;
  }
};

const checkQuizId = async (id, courseid) => {
  try {
    const { cid } = await Quiz.query().findById(id).first();
    return courseid == cid;
  } catch (_) {
    return false;
  }
};

const checkQuestionId = async (qid, Qid) => {
  try {
    const { id } = await Question.query().findById(qid).first();
    return Qid == id;
  } catch (_) {
    return false;
  }
};

const checkAnswerId = async (id, Qid) => {
  try {
    const { qid } = await Answer.query().findById(id).first();
    return Qid == qid;
  } catch {
    return false;
  }
};

export { getQuestions, score };
