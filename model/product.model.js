const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true }, // Changed to Number
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: {
      type: Number, // Changed to Number
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: Number, // Changed to Number
      required: true,
      default: 0,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
