const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const AppError = require("./utils/customErrors");
// const Product = require("./model/product.model");
const productRoutes = require("./routes/products.route");

const port = 3000;

app.use(express.json());

// Middleware for handling errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    status: "error",
    statusCode: err.statusCode,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my page!</h1>");
});

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({}); //no filtering is applied.(It should return all products)
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
app.use("/api", productRoutes);

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
