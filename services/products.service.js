const Product = require("../model/product.model");
const { AppError, NotFoundError } = require("../utils/customErrors");

const addProduct = async (productData) => {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    throw new AppError("Error adding product");
  }
};

const showAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    throw new AppError("Error fetching product details");
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  } catch (error) {
    console.error(error);

    throw new AppError("Error fetching product details");
  }
};

module.exports = { addProduct, showAllProducts, getProductById };
