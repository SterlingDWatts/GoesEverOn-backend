const knex = require("../db/connection");

function list() {
  return knex("shows")
    .leftJoin("shows_genres", "shows.show_id", "shows_genres.show_id")
    .leftJoin("genres", "shows_genres.genre_id", "genres.genre_id")
    .select(
      knex.raw(
        "shows.show_name, shows.show_description, shows.show_year, array_agg(genres.genre_name) as genres",
      ),
    )
    .groupBy(
      "shows.show_id",
      "shows.show_name",
      "shows.show_description",
      "shows.show_year",
    )
    .orderBy("shows.show_id");
}

function create(show) {
  return knex("shows")
    .insert(show)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(show_id) {
  return knex("shows").select("*").where({ show_id }).first();
}

module.exports = {
  list,
  create,
  read,
};
