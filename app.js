const express = require("express");
const app = express();
const Ticket = require("./seedDB");

app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "client/build/index.html");
});

app.get("/api/tickets", (req, res) => {
  if (req.query.searchText) {
    const { searchText } = req.query;
    console.log(searchText);
    Ticket.find({}).then((allTickets) => {
      const titlesIncludingSearch = allTickets.filter((ticket) => {
        const lowerCasedTitle = ticket.title.toLowerCase();
        const lowerCasedSearch = searchText.toLowerCase();
        return lowerCasedTitle.includes(lowerCasedSearch);
      });
      res.json(titlesIncludingSearch);
    });
  } else {
    Ticket.find({}).then((allTickets) => res.json(allTickets));
  }
});
module.exports = app;
