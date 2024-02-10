const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/createuser", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
    });
    await newUser.save();
    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
