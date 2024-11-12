const Cart = require("../model/cart.model");
const User = require("../model/user.model");
const Product = require("../model/product.model");
const { NotFoundError, ValidationError } = require("../utils/customErrors");

const addToCart = async ({ userId, productId, quantity }) => {
  // Find the user by userId
  const user = await User.findOne({ _id: userId });
  if (!user) throw new NotFoundError("User not found");

  const product = await Product.findOne({ id: productId });
  if (!product) throw new NotFoundError("Product not found");

  const price = product.price;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [], totalQuantity: 0, totalAmount: 0 });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === product._id.toString()
  );
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.totalPrice += price * quantity;
  } else {
    cart.items.push({
      customId: product.id,
      productId: product._id,
      quantity,
      totalPrice: price * quantity,
    });
  }
  cart.totalQuantity += quantity;
  cart.totalAmount += price * quantity;

  await cart.save();
  console.log("Added to cart successfully!");
  return cart;
};

const showCart = async (userId) => {
  const cart = await Cart.findOne({ userId: userId }).populate(
    "items.productId"
  ); // Populate product details
  if (!cart) throw new NotFoundError("Cart not found");
  return cart;
};

const updateCartItemQuantity = async (userId, productId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  // Find the cart for the user
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new NotFoundError("Cart not found.");
  }
  console.log("Cart is:", cart);
  // Find the cart item to update using customId
  const cartItem = cart.items.find(
    (item) => item.customId === productId // Compare as strings
  );

  console.log("Cart item:", cartItem);

  if (!cartItem) {
    throw new NotFoundError("Product not found in cart.");
  }
  console.log("Product No:", productId);
  const product = await Product.findOne({ id: productId });
  if (!product) {
    throw new NotFoundError("Product not found.");
  }

  // Update the cart item's quantity and totalPrice
  cartItem.quantity = quantity;
  cartItem.totalPrice = cartItem.quantity * product.price; // Assuming price is the same

  // Update the cart totals
  cart.totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cart.totalAmount = cart.items.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  // Save the cart
  await cart.save();

  return cart; // Return the updated cart
};

const removeProduct = async (userId, id) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new NotFoundError("Cart not found");
  console.log(typeof id);
  const itemIndex = cart.items.findIndex(
    (item) => item.customId.toString() === id
  );
  if (itemIndex === -1) throw new NotFoundError("Product not found in cart");

  const removedItem = cart.items[itemIndex];
  cart.totalQuantity -= removedItem.quantity;
  cart.totalAmount -= removedItem.totalPrice;

  cart.items.splice(itemIndex, 1);
  await cart.save();

  return cart;
};

const placeOrder = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0)
    throw new ValidationError("Cart is empty");

  const orderTotalAmount = cart.totalAmount;
  const orderedItems = cart.items;

  // Clear the cart after placing the order
  cart.items = [];
  cart.totalQuantity = 0;
  cart.totalAmount = 0;
  await cart.save();

  return { orderTotalAmount, orderedItems };
};

module.exports = {
  addToCart,
  showCart,
  updateCartItemQuantity,
  removeProduct,
  placeOrder,
};
