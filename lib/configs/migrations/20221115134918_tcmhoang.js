import Models from "../../models/models.js";
const ms = [
  Models.Announcements,
  Models.Answer,
  Models.Course,
  Models.Question,
  Models.QuestionAnswer,
  Models.Quiz,
  Models.User,
  Models.UserCourse,
];

export async function up(knex) {
  await knex.schema
    .createTable(Models.Announcements.tableName, (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("desc");
    })
    .createTable(Models.Answer.tableName, (table) => {
      table.increments("id").primary();
      table.integer("qid");
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
      table
        .string("username")
        .unique({ indexName: "username_unique", deferrable: "immediate" });
      table.string("password");
      table.string("rtoken").nullable();
    });
}

export async function down(knex) {
  ms.forEach(async (m) => await knex.dropTableIfExists(m.tableName));
}

export { ms };
