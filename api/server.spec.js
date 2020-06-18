const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

describe("server.js", () => {
  it("should be using the testing environment", () => {
    expect(process.env.DB_ENV).toEqual("testing");
  });
  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it("should return correct message", async () => {
      const res = await request(server).get("/");
      expect(res.body.api).toBe("up");
      expect(res.body).toEqual({ api: "up" });
    });
  });
  describe("item router", () => {
    describe("GET /", () => {
      beforeEach(async () => {
        await db("items").truncate();
      });
      it("should return 200 OK", async () => {
        const res = await request(server).get("/api/items");
        expect(res.status).toBe(200);
      });
      it("should return an empty array", async () => {
        const res = await request(server).get("/api/items");
        expect(res.body).toEqual([]);
      });
    });
    describe("POST /", () => {
      beforeEach(async () => {
        await db("items").truncate();
      });
      it("should add a new item", async () => {
        const name = "Broadsword";
        const armor = 0;
        const damage = 10;
        const res = await request(server)
          .post("/api/items")
          .send({ name, armor, damage });
        expect(res.body).toEqual({ id: 1, name, armor, damage });
      });
      it("should add multiple items", async () => {
        const items = [{ name: "Mage Staff" }, { name: "Heavy Buckler" }];
        await request(server).post("/api/items").send(items);
        let itemList = await request(server).get("/api/items");
        expect(itemList.body).toHaveLength(items.length);
      });
    });
    describe("DELETE /:id", () => {
      beforeAll(async () => {
        await db("items").truncate();
      });
      afterAll(async () => {
        await db("items").truncate();
      });
      it("should start with an empty table", async () => {
        const res = await request(server).get("/api/items");
        expect(res.body).toHaveLength(0);
      });
      it("should add an item", async () => {
        const item = { name: "Katana", armor: 0, damage: 20 };
        const res = await request(server).post("/api/items").send(item);
        expect(res.body).toEqual({ ...item, id: 1 });
      });
      it("should successfully remove the item", async () => {
        const res = await request(server).delete("/api/items/1");
        expect(res.status).toBe(204);
      });
    });
  });
});
