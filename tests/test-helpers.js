function makeShowsArray() {
  return [
    {
      show_name: "Utopia",
      show_description: `A group of young adults...`,
      show_year: 2020,
    },
    {
      show_name: "Drops of God",
      show_description: `Something about wine...`,
      show_year: 2023,
    },
    {
      show_name: "Severance",
      show_description: `Something about work...`,
      show_year: 2022,
    },
    {
      show_name: "Foundation",
      show_description: `Something about space...`,
      show_year: 2021,
    },
  ];
}

function makeUsersArray() {
  return [
    { user_email: "test1@gmail.com", user_sub: "12", user_role: "partner" },
  ];
}

function makeHashedUsersArray(users) {
  return users.map((user) => ({
    ...user,
    user_sub: "$2a$12$6LMNoawvxlTUmvObEaH97.VuKgJkI4B44NzX53DP2yNVJipMgkMYC",
  }));
}

function makeGoesEverOnFixtures() {
  const testShows = makeShowsArray();
  const testUsers = makeUsersArray();
  const testHashedUsers = makeHashedUsersArray(testUsers);
  return {
    testShows,
    testUsers,
    testHashedUsers,
  };
}

function cleanTables(knex) {
  return knex
    .raw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`)
    .then(() => knex.raw(`TRUNCATE TABLE shows RESTART IDENTITY CASCADE`));
}

function seedShowsTable(knex, shows) {
  return knex("shows").insert(shows);
}

function seedUsersTable(knex, users) {
  return knex("users").insert(users);
}

module.exports = {
  makeGoesEverOnFixtures,
  cleanTables,
  seedShowsTable,
  seedUsersTable,
};
