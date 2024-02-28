exports.up = function (knex) {
  return knex.schema.createTable("genres", (table) => {
    table.increments("genre_id").primary();
    table.string("genre_name").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("genres");
};
