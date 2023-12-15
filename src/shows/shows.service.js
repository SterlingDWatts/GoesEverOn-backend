const knex = require("../db/connection");

function list() {
  return knex("shows").select("*");
}

function create(show) {
  return knex("shows")
    .insert(show)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
};
