const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server.js");

const seeds = [{ id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980 }];

describe("the route handlers", () => {
  beforeEach(() => {
    return db.migrate.rollback().then(() => {
      return db.migrate.latest().then(() => {
        return db.seed.run();
      });
    });
  });
  describe("get /games", () => {
    it("returns a list of games", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual(seeds);
    });
    it("returns status code 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });
    it("returns empty array if no games", async () => {
      await request(server).delete("/games/1");
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });
  describe("post /games", () => {
    it("returns a 201 when game is successfully added", async () => {
      const body = { title: "Final Fantasy", genre: "RPG" };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(201);
    });
    it("returns a 422 if new game object is empty", async () => {
      const body = {};
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(422);
    });
    it("returns a 422 if new game object has no title", async () => {
      const body = { genre: "RPG" };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(422);
    });
    it("returns a 422 if new game object has no genre", async () => {
      const body = { title: "Final Fantasy" };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(422);
    });
  });
  describe("delete /games/:id", () => {
    it("returns the number of records deleted if successful", async () => {
      const response = await request(server).delete("/games/1");
      expect(response.body).toEqual(1);
    });
    it("returns status code 200 if successful", async () => {
      const response = await request(server).delete("/games/1");
      expect(response.status).toBe(200);
    });
    it("returns a 404 if game does not exist", async () => {
      const response = await request(server).delete("/games/57");
      expect(response.status).toBe(404);
    });
  });
  describe("get /games/:id", () => {
    it("returns a 404 if game does not exist", async () => {
      const response = await request(server).get("/games/90");
      expect(response.status).toBe(404);
    });
    it("returns status code 200 if successful", async () => {
      const response = await request(server).get("/games/1");
      expect(response.status).toBe(200);
    });
    it("returns game object if successful", async () => {
      const response = await request(server).get("/games/1");
      expect(response.body).toEqual(seeds);
    });
  });
});
