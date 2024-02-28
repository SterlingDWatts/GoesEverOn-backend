const episodes = require("../fixtures/episodes");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE episodes RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("episodes").insert(episodes);
    });
};
