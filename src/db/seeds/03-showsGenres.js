const showsGenres = require("../fixtures/showsGenres");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE shows_genres RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("shows_genres").insert(showsGenres);
    });
};
