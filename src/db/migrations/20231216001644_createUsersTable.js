exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("user_sub").primary();
    table.string("user_email").notNullable();
    table
      .enu("user_role", ["partner", "admin", "user"])
      .notNullable()
      .defaultTo("user");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
