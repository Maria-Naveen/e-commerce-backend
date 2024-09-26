const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my page!</h1>");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
