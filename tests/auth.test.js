const request = require("supertest");
const app = require("../src/app");
const knex = require("../src/db/connection");
const helpers = require("./test-helpers");

describe("path /auth", () => {
  const { testUsers, testHashedUsers } = helpers.makeGoesEverOnFixtures();

  beforeAll(() => helpers.cleanTables(knex));

  afterEach(() => helpers.cleanTables(knex));

  afterAll(() => knex.destroy());

  describe("POST /auth/login method", () => {
    it("returns with 400 if required data is missing", async () => {
      const invalidUser = {
        name: "Bilbo Baggins",
      };
      const response = await request(app)
        .post("/auth/login")
        .send({ data: invalidUser });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("A 'user_email' property is required.");
    });

    it("returns with 404 if email is not found", async () => {
      const invalidUser = {
        ...testUsers[0],
        user_email: "not-in-database@gmail.com",
      };
      const response = await request(app)
        .post("/auth/login")
        .send({ data: invalidUser });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User cannot be found.");
    });

    describe("given there are users in the database", () => {
      beforeEach(() => helpers.seedUsersTable(knex, testHashedUsers));
      it("returns with 401 if user_sub does not match", async () => {
        const invalidUser = {
          ...testUsers[0],
          user_sub: "not-a-match",
        };
        const response = await request(app)
          .post("/auth/login")
          .send({ data: invalidUser });
        expect(response.status).toBe(401);
      });

      it("returns with 200 and if login is successful", async () => {
        const response = await request(app)
          .post("/auth/login")
          .send({ data: testUsers[0] });
        expect(response.status).toBe(200);
      });
    });
  });
});
