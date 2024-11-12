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

  updateCartItem: catchAsyncError(async (req, res) => {
    // const { userId } = req.user.userId;
    // console.log("User from controller:", userId);
    const { productId, quantity } = req.body;
    // console.log("User from controller:", req.user.userId);
    const updatedCart = await cartService.updateCartItemQuantity(
      req.user.userId,
      productId,
      quantity
    );
    res.status(200).json(updatedCart);
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
