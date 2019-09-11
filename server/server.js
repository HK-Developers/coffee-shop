const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./routes/User");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!err) console.log("MongoDB connected");
  }
);

app.use("/api/user", User);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
