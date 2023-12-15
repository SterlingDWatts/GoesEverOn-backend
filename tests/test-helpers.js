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

function makeGoesEverOnFixtures() {
  const testShows = makeShowsArray();
  return {
    testShows,
  };
}

function cleanTables(knex) {
  return knex.raw(`TRUNCATE TABLE shows RESTART IDENTITY CASCADE`);
}

function seedShowsTable(knex, shows) {
  return knex("shows").insert(shows);
}

module.exports = {
  makeGoesEverOnFixtures,
  cleanTables,
  seedShowsTable,
};
