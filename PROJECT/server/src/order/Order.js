const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    cart: [
      {
        item: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    payment_method: "paypal" | "esewa" | "cod",
    bill_amount: Number,
    isPaid: Boolean,
    isConfirmed: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
