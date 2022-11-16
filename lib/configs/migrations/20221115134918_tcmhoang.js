export async function up(knex) {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username");
      table.string("password");
      table.string("rtoken");
      table.setNullable("rtoken");
    })
    .createTable("courses", (table) => {
      table.integer("cid");
      table.integer("uid");
      table.primary(["cid", "uid"]);
    })
    .createTable("courses", (table) => {
      table.increments("id").primary();
      table.string("title");
    })
    .createTable("quizzes", (table) => {
      table.increments("id").primary();
      table.integer("cid");
      table.string("value");

      table.foreign("cid").references("id").inTable("courses");
    })
    .createTable("answers", (table) => {
      table.increments("id").primary();
      table.integer("qid");
      table.boolean("correct");
      table.string("value");

      table.foreign("qid").references("id").inTable("quizzes");
    });
}
export async function down(knex) {
  await knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("courses")
    .dropTableIfExists("quizzes")
    .dropTableIfExists("answers");
}
