const seed = require("./seeder");
seed(process.env.MONGO_URI);

const mongoose = require("mongoose");
