const express = require("express");
const verifyUser = require("../middlewares/verifyUser");

const {
  addProduct,
  showProducts,
} = require("../controllers/product.controllers");

const router = express.Router();

router.post("/products", addProduct);
router.get("/products", verifyUser, showProducts);

module.exports = router;
