const request = require("supertest");
const app = require("../app");
describe("Survivors API", () => {
  describe("Test GET/getallsurvivors", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/api/v1/getallsurvivors")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  describe("Test POST/register", () => {
    const survivors = {
      name: "name",
      age: 111,
      gender: "M",
      water: 1,
      food: 1,
      medication: 1,
      ammunition: 1,
      last_location: "isl",
    };
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .post("/api/v1/register")
        .send(survivors)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
