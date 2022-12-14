const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: "Vendor is required",
    },
    price: {
      type: Number,
      required: "Price is required",
    },
    avatar: String,
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: "Stock is required",
    },
    description: String,
    reviews: [
      {
        text: String,
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        author: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
