const users = require("./routes/users");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

mongoose.set("strictQuery", true);

console.log("Connecting");
mongoose
  .connect(process.env.Anilink_DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors());

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use("/watchlist", users);
app.get("/", (req, res) => {
  res.send("hello world");
});
