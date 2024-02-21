const express = require("express");
const router = express.Router();
const mongodb = require("../database/db");

router.post("/foodCollection", async (req, res) => {
  try {
    console.log();
    res.send(global.allFoodsData);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
