const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  console.log(req.body.uId);
  // find user in database
  let user = await User.findOne({ uId: req.body.uId });
  // if user doesn't exist, create a new user with local storage watchlist
  if (!user) {
    createNewUser(req, res);
  } else {
    // user exists, send the stored watchlist to user
    let m_response = {
      message: "User already exists in database, loading watchlist.",
      watchlistData: user.watchlistData,
    };
    res.send(m_response);
  }
});

router.put("/", jsonParser, async (req, res) => {
  // find user in database
  console.log(`received put request`);
  let user = await User.findOne({ uId: req.body.uId });
  // if user doesn't exist, create a new user with local storage watchlist
  if (!user) {
    let m_response = {
      message: "User not found",
      watchlistData: [],
    };
    res.send(m_response);
  } else {
    // user exists, update watchlist
    user.watchlistData = req.body.watchlistData;
    user.save();
    let m_response = {
      message: "User found, updating watchlist.",
      watchlistData: user.watchlistData,
    };
    res.send(m_response);
  }
});
async function createNewUser(req, res) {
  user = new User({
    uId: req.body.uId,
    watchlistData: req.body.watchlistData,
  });
  let saveResult = await user.save();
  console.log(saveResult);
  let m_response = {
    message:
      "User not found in database, uploading watchlist from local storage",
    watchlistData: req.body.watchlistData,
  };
  res.send(m_response);
}

module.exports = router;
