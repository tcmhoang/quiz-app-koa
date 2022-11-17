import { ms } from "../migrations/20221115134918_tcmhoang.js";
import Models from "../../models/models.js";

export async function seed(knex) {
  ms.forEach(async (m) => {
    await knex(m.tableName).del();
  });

  await knex(Models.User.tableName).insert([
    { id: 1, username: "test", password: "test" },
  ]);

  await knex(Models.Course.tableName).insert([
    {
      id: 1,
      title: "enrolled",
    },
    {
      id: 2,
      title: "unenrolled",
    },
  ]);

  await knex(Models.UserCourse.tableName).insert([
    {
      uid: 1,
      cid: 1,
    },
  ]);

  await knex(Models.Announcements.tableName).insert([
    {
      id: 1,
      title: "ok",
      desc: "test",
    },
  ]);

  await knex(Models.Quiz.tableName).insert([
    {
      id: 1,
      cid: 1,
      value: "Test Quiz for enrolled Course",
    },
  ]);
  await knex(Models.Question.tableName).insert([
    {
      id: 1,
      qid: 1,
      desc: "The answer of this question is 1",
    },
  ]);
  await knex(Models.Answer.tableName).insert([
    {
      id: 1,
      qid: 1,
      desc: "1",
      correct: true,
    },
    {
      id: 2,
      qid: 1,
      desc: "2",
      correct: false,
    },
    {
      id: 3,
      qid: 1,
      desc: "3",
      correct: false,
    },
  ]);
  await knex(Models.QuestionAnswer.tableName).insert([
    {
      qid: 1,
      aid: 1,
    },
    {
      qid: 1,
      aid: 2,
    },
    {
      qid: 1,
      aid: 3,
    },
  ]);
}
