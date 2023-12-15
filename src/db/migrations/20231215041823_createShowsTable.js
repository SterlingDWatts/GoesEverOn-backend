exports.up = function (knex) {
  return knex.schema.createTable("shows", (table) => {
    table.increments("show_id").primary();
    table.string("show_name").notNullable();
    table.text("show_description");
    table.integer("show_year").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("shows");
};
