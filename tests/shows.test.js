const request = require("supertest");
const app = require("../src/app");
const knex = require("../src/db/connection");
const helpers = require("./test-helpers");

describe("path /shows", () => {
  const { testShows, testGenres, testShowsGenres } =
    helpers.makeGoesEverOnFixtures();

  beforeAll(() => helpers.cleanTables(knex));

  afterEach(() => helpers.cleanTables(knex));

  afterAll(() => knex.destroy());

  describe("GET /shows method", () => {
    describe("given there are no shows in the database", () => {
      it("returns with 200 and an empty array", async () => {
        const response = await request(app).get("/shows");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
      });
    });

    describe("given there are shows in the database", () => {
      beforeEach(() =>
        helpers.seedShowsTable(knex, testShows, testGenres, testShowsGenres),
      );

      it("returns with 200 and an array of shows", async () => {
        const response = await request(app).get("/shows");

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(4);
        testShows.forEach((show, idx) => {
          expect(response.body.data[idx].show_name).toBe(show.show_name);
          expect(response.body.data[idx].show_description).toBe(
            show.show_description,
          );
          expect(response.body.data[idx].show_year).toBe(show.show_year);
          expect(response.body.data[idx].genres).toEqual(show.genres);
        });
      });
    });
  });

  describe("POST /shows method", () => {
    it("returns with 400 if invalid data is sent", async () => {
      const invalidShow = {
        show_name: "The Wheel of Time",
        show_info: `Something about magic...`,
      };
      const response = await request(app)
        .post("/shows")
        .send({ data: invalidShow });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid field(s): show_info");
    });

    it("returns with 400 if required data is missing", async () => {
      const invalidShow = {
        show_description: `Something about magic...`,
        show_year: 2021,
      };
      const response = await request(app)
        .post("/shows")
        .send({ data: invalidShow });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("A 'show_name' property is required.");
    });

    describe("given there are no shows in the database", () => {
      it("returns with 201 and the new show", async () => {
        const newShow = {
          show_name: "The Wheel of Time",
          show_description: `Something about magic...`,
          show_year: 2021,
        };
        const response = await request(app)
          .post("/shows")
          .send({ data: newShow });
        expect(response.status).toBe(201);
        expect(response.body.data.show_name).toBe(newShow.show_name);
        expect(response.body.data.show_description).toBe(
          newShow.show_description,
        );
        expect(response.body.data.show_year).toBe(newShow.show_year);
      });
    });

    describe("given there are shows in the database", () => {
      beforeEach(() =>
        helpers.seedShowsTable(knex, testShows, testGenres, testShowsGenres),
      );
      it("returns with 201 and the new show", async () => {
        const newShow = {
          show_name: "Succession",
          show_description: `Something about family...`,
          show_year: 2021,
        };
        await request(app).post("/shows").send({ data: newShow });
        const response = await request(app).get("/shows");
        expect(response.body.data).toHaveLength(5);
        expect(response.body.data[4].show_name).toBe(newShow.show_name);
        expect(response.body.data[4].show_description).toBe(
          newShow.show_description,
        );
        expect(response.body.data[4].show_year).toBe(newShow.show_year);
      });
    });
  });

  describe("GET /shows/:showId method", () => {
    describe("given there are no shows in the database", () => {
      it("returns with 404", async () => {
        const response = await request(app).get("/shows/1");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Show cannot be found.");
      });
    });

    describe("given there are shows in the database", () => {
      beforeEach(() =>
        helpers.seedShowsTable(knex, testShows, testGenres, testShowsGenres),
      );
      it("returns with 200 and the show", async () => {
        const response = await request(app).get("/shows/1");
        expect(response.status).toBe(200);
        expect(response.body.data.show_name).toBe(testShows[0].show_name);
        expect(response.body.data.show_description).toBe(
          testShows[0].show_description,
        );
        expect(response.body.data.show_year).toBe(testShows[0].show_year);
      });
    });
  });
});
