const users = require("./routes/users");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.set("strictQuery", true);

console.log("Connecting");
mongoose
  .connect("mongodb://127.0.0.1:27017/Anilink")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use("/api/users", users);
