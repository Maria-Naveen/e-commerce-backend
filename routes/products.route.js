const express = require("express");
const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");

const {
  addProduct,
  showAllProducts,
  showProduct,
} = require("../controllers/product.controllers");

const router = express.Router();

router.post("/products", verifyUser, verifyAdmin, addProduct);
router.get("/products", verifyUser, showAllProducts);
router.get("/products/:id", verifyUser, showProduct);

module.exports = router;
