const express = require("express");
const verifyUser = require("../middlewares/verifyUser");

const {
  addToCart,
  showCart,
  updateCartItem,
  removeProduct,
  placeOrder,
} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/cart", verifyUser, addToCart);

router.get("/cart", verifyUser, showCart);

router.patch("/cart", verifyUser, updateCartItem);

router.delete("/cart/:id", verifyUser, removeProduct);

router.post("/cart/order", verifyUser, placeOrder);

module.exports = router;
