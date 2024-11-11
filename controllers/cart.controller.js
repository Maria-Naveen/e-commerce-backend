const cartService = require("../services/cart.service");
const catchAsyncError = require("../utils/catchAsyncError");

module.exports = {
  addToCart: catchAsyncError(async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await cartService.addToCart({
      userId: req.user.userId,
      productId,
      quantity,
    });
    res.status(200).json(cart);
  }),

  showCart: catchAsyncError(async (req, res) => {
    const cart = await cartService.showCart(req.user.userId);
    res.status(200).json(cart);
  }),

  removeProduct: catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const cart = await cartService.removeProduct(req.user.userId, id);
    res.status(200).json(cart);
  }),

  placeOrder: catchAsyncError(async (req, res) => {
    const orderDetails = await cartService.placeOrder(req.user.userId);
    res.status(200).json({ message: "Order placed", ...orderDetails });
  }),
};
