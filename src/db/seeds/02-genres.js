const genres = require("../fixtures/genres");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE genres RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("genres").insert(genres);
    });
};
