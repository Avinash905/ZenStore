const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item",
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
    color: {
      type: String,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", schema);

module.exports = Cart;
