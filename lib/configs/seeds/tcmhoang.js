import User from "../../models/users";
import Course from "../../models/courses";

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex(User.tablename).del();
  await knex(User.tableName).insert([
    { id: 1, username: "test", password: "test" },
  ]);
  await knex(Course.tableName).del();
  // Inserts seed entries
  await knex(Course.tableName).insert([
    {
      id: 1,
      title: "enrolled",
    },
    {
      id: 2,
      title: "unenrolled",
    },
  ]);
}
