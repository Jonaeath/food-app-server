const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.post(
  "/createuser",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password minimum length should be 5 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // --- Password Hash --- //
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        location: req.body.location,
      });
      await newUser.save();
      res.json({ success: true, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
