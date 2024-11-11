const productService = require("../services/products.service");
const catchAsyncError = require("../utils/catchAsyncError");

const addProduct = catchAsyncError(async (req, res) => {
  const product = await productService.addProduct(req.body);
  res.status(201).json({ message: "Product added", product: product });
});

const showAllProducts = catchAsyncError(async (req, res) => {
  const products = await productService.showAllProducts();
  res.status(200).json({ products });
});
const showProduct = catchAsyncError(async (req, res) => {
  const myId = req.params.id;
  const product = await productService.getProductById(myId);
  res.status(200).json({ product });
});

module.exports = { addProduct, showAllProducts, showProduct };
