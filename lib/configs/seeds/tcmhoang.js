export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([{ username: "test", password: "test" }]);
  await knex("courses").del();
  // Inserts seed entries
  await knex("courses").insert([
    {
      title: "Test",
    },
  ]);
}
