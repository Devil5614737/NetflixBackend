const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).send("User existed");
  } else {
    const salt = await bcrypt.genSalt(12);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const user = await newUser.save();
    res.status(200).json(user);
  }
});

module.exports = router;
