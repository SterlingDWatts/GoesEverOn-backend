const knex = require("../db/connection");

function validate(user_email) {
  return knex("users").select("*").where({ user_email }).first();
}

module.exports = {
  validate,
};
