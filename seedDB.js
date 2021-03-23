const seed = require("./seeder");
seed(process.env.MONGO_URI);

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: { type: String, required: true },
  done: Boolean,
  creationTime: { type: Date, required: true },
  labels: [String],
});

module.exports = mongoose.model("Ticket", ticketSchema);
