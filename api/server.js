const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

const itemsRouter = require("../items/itemsRouter");
server.use("/api/items", itemsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
