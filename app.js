const express = require("express");
const app = express();
const Ticket = require("./seedDB");

app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "client/build/index.html");
});

app.get("/api/tickets", (req, res) => {
  Ticket.find({}).then((result) => res.json(result));
});
module.exports = app;
