const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    uId: {
      type: String,
      required: true,
      unique: true,
    },
    watchlistData: {
      type: Array,
      required: true,
    },
  })
);
exports.User = User;
