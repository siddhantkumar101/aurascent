const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    inspiredBy: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: String,
      required: true,
      default: "50ml",
    },
    family: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      top: [String],
      middle: [String],
      base: [String],
    },
    image: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      required: true,
      default: 100,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
