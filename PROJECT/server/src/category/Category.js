const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required",
  },
  children: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: [],
    },
  ],
  isParent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
