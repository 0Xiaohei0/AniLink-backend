const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  let saveResult = await user.save();
  console.log(saveResult);
  res.send(user);
});

module.exports = router;
