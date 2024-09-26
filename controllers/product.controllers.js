const productService = require("../services/products.service");

const addProduct = async (req, res) => {
  const product = await productService.addProduct(req.body);
  res.status(201).json({ message: "Product added", product: product });
};

const showProducts = async (req, res) => {
  const products = await productService.showProducts();
  res.status(200).json({ products });
};

module.exports = { addProduct, showProducts };
