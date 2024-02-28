function makeShowsArray() {
  return [
    {
      show_name: "Utopia",
      show_description: `A group of young adults...`,
      show_year: 2020,
      genres: ["Drama", "Mystery", "Sci-Fi"],
    },
    {
      show_name: "Drops of God",
      show_description: `Something about wine...`,
      show_year: 2023,
      genres: ["Drama"],
    },
    {
      show_name: "Severance",
      show_description: `Something about work...`,
      show_year: 2022,
      genres: ["Drama", "Mystery", "Sci-Fi"],
    },
    {
      show_name: "Foundation",
      show_description: `Something about space...`,
      show_year: 2021,
      genres: ["Drama", "Sci-Fi"],
    },
  ];
}

function makeGenresArray() {
  return [
    { genre_name: "Drama" },
    { genre_name: "Mystery" },
    { genre_name: "Sci-Fi" },
  ];
}

function makeShowsGenresArray() {
  return [
    { show_id: 1, genre_id: 1 },
    { show_id: 1, genre_id: 2 },
    { show_id: 1, genre_id: 3 },
    { show_id: 2, genre_id: 1 },
    { show_id: 3, genre_id: 1 },
    { show_id: 3, genre_id: 2 },
    { show_id: 3, genre_id: 3 },
    { show_id: 4, genre_id: 1 },
    { show_id: 4, genre_id: 3 },
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
  const testGenres = makeGenresArray();
  const testShowsGenres = makeShowsGenresArray();
  const testUsers = makeUsersArray();
  const testHashedUsers = makeHashedUsersArray(testUsers);
  return {
    testShows,
    testGenres,
    testShowsGenres,
    testUsers,
    testHashedUsers,
  };
}

function cleanTables(knex) {
  return knex
    .raw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`)
    .then(() => knex.raw(`TRUNCATE TABLE shows_genres`))
    .then(() => knex.raw(`TRUNCATE TABLE shows RESTART IDENTITY CASCADE`))
    .then(() => knex.raw(`TRUNCATE TABLE genres RESTART IDENTITY CASCADE`));
}

function seedShowsTable(knex, shows, genres, showsGenres) {
  return knex("shows")
    .insert(
      shows.map(({ show_name, show_description, show_year }) => ({
        show_name,
        show_description,
        show_year,
      })),
    )
    .then(() => knex("genres").insert(genres))
    .then(() => knex("shows_genres").insert(showsGenres));
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
