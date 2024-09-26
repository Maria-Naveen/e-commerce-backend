const express = require("express");
const {
  addProduct,
  showProducts,
} = require("../controllers/product.controllers");

const router = express.Router();

router.post("/products", addProduct);
router.get("/products", showProducts);

module.exports = router;
