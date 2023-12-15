exports.up = function (knex) {
  return knex.schema.createTable("videos", (table) => {
    table.string("video_url").primary();
    table.string("video_title").notNullable();
    table.date("video_release_date");
    table.string("video_description");
    table.integer("show_id").unsigned();
    table
      .foreign("show_id")
      .references("show_id")
      .inTable("shows")
      .onDelete("CASCADE");
    table.integer("show_season");
    table.integer("show_episode");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("videos");
};
