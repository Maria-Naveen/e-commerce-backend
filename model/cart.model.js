const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [
    {
      customId: { type: String },
      productId: { type: String, ref: "Product" },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number },
    },
  ],
  totalQuantity: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cart", cartSchema);
