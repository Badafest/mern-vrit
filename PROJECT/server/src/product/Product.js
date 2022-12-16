const mongoose = require("mongoose");
const User = require("../user/User");

const Category = require("../category/Category");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: "Vendor is required",
    },
    price: {
      type: String,
      required: "Price is required",
    },
    main_category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: "Main category is required",
    },
    sub_category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: "Sub category is required",
    },
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
          ref: User,
        },
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.pre("save", async function (next) {
  const sub_categories = this.main_category.children;
  if (sub_categories.includes(this.sub_category) === -1) {
    throw new Error(
      "Invalid sub category => ",
      this.sub_category.name,
      " in main category => ",
      this.main_category.name
    );
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
