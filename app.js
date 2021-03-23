const express = require("express");
const app = express();

app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "client/build/index.html");
});

module.exports = app;
