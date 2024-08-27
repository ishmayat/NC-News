const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const expectedEndPoints = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("Responds with an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        expect(Array.isArray(topics)).toBe(true);
      });
  });
  test("Responds with an array of topics with slug & description props", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        // console.log(body, "GET /api response");
        const topics = body.topics;
        expect(topics).toEqual([
          { slug: "mitch", description: "The man, the Mitch, the legend" },
          { slug: "cats", description: "Not dogs" },
          { slug: "paper", description: "what books are made of" },
        ]);
      });
  });
  test("404: Responds with 404 with invalid route/endpoint/path", () => {
    return request(app)
      .get("/api/topicks")
      .expect(404)
      .then((response) => {
        // console.log(response, "<--- response message");
        expect(response.body.msg).toBe("Route/endpoint not found");
      });
  });
});
describe("GET /api", () => {
  test("Responds with a JSON object describing all the available endpoints.", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        // console.log(response.body, "<--- GET /api response");
        expect(200);
        expect(response.body).toEqual(expectedEndPoints);
      });
  });
});
