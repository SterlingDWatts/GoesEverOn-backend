const shows = require("../fixtures/shows");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE shows RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("shows").insert(shows);
    });
};
