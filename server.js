const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/products.route");
const cartRoutes = require("./routes/cart.route");
const errorHandler = require("./utils/globalErrorHandler");

const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my page!</h1>");
});

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database!");
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  } catch (error) {
    console.log("Connected failed!");
  }
};

connectDB();
