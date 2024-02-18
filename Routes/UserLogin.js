const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post(
  "/userlogin",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password minimum length should be 5 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try Login with correct email" });
      }

      passwordCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Try Login with correct Password" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
