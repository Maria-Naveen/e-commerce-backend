const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: {
      type: String,
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: String,
      required: true,
      default: 0,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
