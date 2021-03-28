const express = require("express");
const app = express();
const Ticket = require("./ticket-mongo.js");
const cors = require("cors");

app.use(express.static(process.cwd() + "/client/build/"));
app.use(cors());
app.use(express.json());

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
  const update = {};
  switch (action) {
    case "done":
      update.done = true;
      break;
    case "undone":
      update.done = false;
      break;
    case "star":
      update.starred = true;
      break;
    case "unstar":
      update.starred = false;
      break;
    default:
      return res
        .status(400)
        .json({ updated: false, message: "Action not allowed" });
  }
  Ticket.findByIdAndUpdate(ticketId, update, { new: true })
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

app.post("/api/tickets/new", (req, res) => {
  const newTicket = req.body;
  if (!newTicket.title) return res.status(400).send("No title");
  if (!newTicket.content) return res.status(400).send("No Content");
  if (!newTicket.userEmail) newTicket.userEmail = "Anonymus@whoknows.com";
  newTicket.creationTime = new Date();

  const ticket = new Ticket(newTicket);
  ticket
    .save()
    .then((savedTicket) => {
      res.json({ added: true, saved: savedTicket });
    })
    .catch((e) =>
      res.json({ added: false, massage: "Internal Server Error", error: e })
    );
});

app.post("/api/tickets/new-comment/:ticketId", (req, res) => {
  const comment = req.body;
  const { ticketId } = req.params;
  if (!comment.text) return res.status(400).send("No Text");
  comment.creationTime = new Date();
  Ticket.findByIdAndUpdate(
    ticketId,
    { $push: { comments: comment } },
    { new: true }
  )
    .then((savedTicket) => {
      res.json({ added: true, saved: savedTicket });
    })
    .catch((e) =>
      res.json({ added: false, massage: "Internal Server Error", error: e })
    );
});

module.exports = app;
