exports.up = function (knex) {
  return knex.schema.createTable("shows_genres", (table) => {
    table.integer("show_id").notNullable();
    table
      .foreign("show_id")
      .references("show_id")
      .inTable("shows")
      .onDelete("CASCADE");
    table.integer("genre_id").notNullable();
    table
      .foreign("genre_id")
      .references("genre_id")
      .inTable("genres")
      .onDelete("CASCADE");
    table.primary(["show_id", "genre_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("shows_genres");
};
