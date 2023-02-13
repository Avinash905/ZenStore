const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "general",
    },
    colors: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", schema);

module.exports = Item;
