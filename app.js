const express = require("express");
const app = express();
const Ticket = require("./seedDB");
const cors = require("cors");

app.use(express.static(process.cwd() + "/client/build/"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});

app.get("/api/tickets", (req, res) => {
  if (req.query.searchText) {
    const { searchText } = req.query;
    Ticket.find({})
      .then((allTickets) => {
        const titlesIncludingSearch = allTickets.filter((ticket) => {
          const lowerCasedTitle = ticket.title.toLowerCase();
          const lowerCasedSearch = searchText.toLowerCase();
          return lowerCasedTitle.includes(lowerCasedSearch);
        });
        res.json(titlesIncludingSearch);
      })
      .catch(() => res.status(500).send("Internal Server Error"));
  } else {
    Ticket.find({})
      .then((allTickets) => res.json(allTickets))
      .catch(() => res.status(500).send("Internal Server Error"));
  }
});

app.get("/api/tickets/allLabels", (req, res) => {
  Ticket.find({})
    .then((allTickets) => {
      const allLabels = [];
      allTickets.forEach((ticket) => {
        ticket.labels.forEach((label) => {
          if (!allLabels.includes(label)) {
            allLabels.push(label);
          }
        });
      });
      res.json(allLabels);
    })
    .catch(() => res.status(500).send("Internal Server Error"));
});

app.patch("/api/tickets/:ticketId/:action", (req, res) => {
  const { ticketId } = req.params;
  if (!ticketId)
    return res
      .status(400)
      .json({ updated: false, message: "No ticket id specified" });
  const { action } = req.params;
  if (!action)
    return res.status(300).json({ updated: false, message: "No action" });
  if (action !== "done" && action !== "undone") {
    return res
      .status(400)
      .json({ updated: false, message: "Action not allowed" });
  }
  const isDone = action === "done";

  Ticket.findByIdAndUpdate(ticketId, { done: isDone }, { new: true })
    .then((updatedTicked) => {
      if (!updatedTicked) {
        return res
          .status(500)
          .json({ updated: false, message: "Internal Server Error" });
      }
      res.json({ updated: true });
    })
    .catch((e) => {
      res.status(404).json({ updated: false, message: "Not Found" });
    });
});
module.exports = app;
