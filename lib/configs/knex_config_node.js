export default {
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
  seeds: {
    directory: "./seeds",
  },
  useNullAsDefault: true,
  debug: true,
};
