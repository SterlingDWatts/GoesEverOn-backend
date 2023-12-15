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

function read(show_id) {
  return knex("shows").select("*").where({ show_id }).first();
}

module.exports = {
  list,
  create,
  read,
};
