export default {
  client: "sqlite3",
  connection: {
    filename: "lib/configs/mydb.sqlite",
  },
  seeds: {
    directory: "lib/configs/seeds",
  },
  useNullAsDefault: true,
  debug: true,
};
