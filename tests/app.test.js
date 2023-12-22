const request = require("supertest");
const app = require("../src/app");

describe("App", () => {
  describe("path /not-a-path", () => {
    describe("GET method", () => {
      it("returns with 404", async () => {
        const response = await request(app).get("/not-a-path");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Not found: /not-a-path");
      });
    });
  });
});
