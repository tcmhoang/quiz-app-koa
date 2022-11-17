import Models from "../../models/models.js";
export async function up(knex) {
  await knex.schema
    .createTable(Models.Announcements.tableName, (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("desc");
    })
    .createTable(Models.Answer.tableName, (table) => {
      table.increments("id").primary();
      table.string("qid");
      table.string("desc");
      table.boolean("correct");
    })
    .createTable(Models.Course.tableName, (table) => {
      table.increments("id").primary();
      table.string("title");
    })
    .createTable(Models.QuestionAnswer.tableName, (table) => {
      table.integer("qid");
      table.integer("aid");
      table.primary(["qid", "aid"]);
    })
    .createTable(Models.Question.tableName, (table) => {
      table.increments("id").primary();
      table.integer("qid");
      table.string("desc");
    })
    .createTable(Models.Quiz.tableName, (table) => {
      table.increments("id").primary();
      table.integer("cid");
      table.string("value");

      table.foreign("cid").references("id").inTable("courses");
    })
    .createTable(Models.UserCourse.tableName, (table) => {
      table.integer("cid");
      table.integer("uid");
      table.primary(["cid", "uid"]);
    })
    .createTable(Models.User.tableName, (table) => {
      table.increments("id").primary();
      table.string("username");
      table.string("password");
      table.string("rtoken");
      table.setNullable("rtoken");
    });
}
export async function down(knex) {
  [
    Models.Announcements,
    Models.Answer,
    Models.Course,
    Models.Question,
    Models.QuestionAnswer,
    Models.Quiz,
    Models.User,
    Models.UserCourse,
  ].forEach(async (m) => await knex.dropTableIfExists(m.tableName));
}
