const express = require("express");
const verifyUser = require("../middlewares/verifyUser");

const {
  addProduct,
  showAllProducts,
  showProduct,
} = require("../controllers/product.controllers");

const router = express.Router();

router.post("/products", verifyUser, addProduct);
router.get("/products", verifyUser, showAllProducts);
router.get("/products/:id", verifyUser, showProduct);

module.exports = router;
