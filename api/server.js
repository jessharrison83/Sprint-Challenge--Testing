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
    .where("id", id)
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

server.post("/games", async (req, res) => {
  const newGame = req.body;
  if (newGame.title && newGame.genre) {
    const game = await db("games").insert(newGame);
    res.status(201).json(game);
  } else if (!newGame.title && !newGame.genre) {
    res.status(422).json({ message: "object cannot be empty" });
  } else if (!newGame.title) {
    res.status(422).json({ message: "must have title" });
  } else {
    res.status(422).json({ message: "must have genre" });
  }
});
server.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  const game = await db("games").where("id", id);
  if (game[0]) {
    res.status(200).json(game);
  } else {
    res.status(404).json({ message: "game not found" });
  }
});

// server.get("/games/:id", (req, res) => {
//   const { id } = req.params;
//   db("games")
//     .where("id", id)
//     .then(game => {
//       if (game) {
//         res.status(200).json(game);
//       } else {
//         res.status(404).json({ message: "game not found" });
//       }
//     })
//     .catch(err => {
//       res.send(err);
//     });
// });
module.exports = server;
