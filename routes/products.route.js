const express = require("express");
const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");
const validateData = require("../middlewares/dataValidation");
const productValidationSchema = require("../validations/product.validation");

const {
  addProduct,
  showAllProducts,
  showProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.post(
  "/products",
  verifyUser,
  verifyAdmin,
  validateData(productValidationSchema),
  addProduct
);
router.get("/products", verifyUser, showAllProducts);
router.get("/products/:id", verifyUser, showProduct);

module.exports = router;
