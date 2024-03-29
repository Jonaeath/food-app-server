const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

require("./database/db");

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/UserLogin"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));


app.get("/", (req, res) => {
  res.send("Food app server is running");
});

app.listen(port, () => {
  console.log(`Food app server running on ${port}`);
});
