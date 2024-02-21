const express = require("express");
const router = express.Router();

router.get("/foodCollection", async (req, res) => {
  try {
    // Send the response with status 200
    res
      .status(200)
      .send({
        allFoodsData: global.allFoodsData,
        allFoodCategory: global.allFoodCategory,
      });
  } catch (error) {
    console.error("Error fetching food data:", error);
    // If an error occurs, send an error response with status 500
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
