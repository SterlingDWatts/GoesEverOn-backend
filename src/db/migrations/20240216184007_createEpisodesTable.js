exports.up = function (knex) {
  return knex.schema.createTable("episodes", (table) => {
    table.increments("episode_id").primary();
    table.string("episode_name").notNullable();
    table.text("episode_description");
    table.date("episode_air_date").notNullable();
    table.integer("episode_number").notNullable();
    table.integer("season_number").notNullable();
    table.integer("show_id").notNullable();
    table
      .foreign("show_id")
      .references("show_id")
      .inTable("shows")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("episodes");
};
