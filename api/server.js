const express = require("express");
const server = express();
const db = require("../data/dbConfig");

server.use(express.json());

server.get("/games", async (req, res) => {
  const games = await db("games");
  res.status(200).json(games);
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  db("games")
    .del(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "could not find that record" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

server.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  const games = await db("games").where("id", id);
  if (games) {
    res.status(200).json(games);
  } else {
    res.status(404).json({ message: "could not find that game" });
  }
});
module.exports = server;
