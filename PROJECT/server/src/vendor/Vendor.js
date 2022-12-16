const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
    unique: true,
  },
  email: {
    type: String,
    required: "Email address is required",
    unique: true,
  },
  phone: {
    type: Number,
    required: "Phone number is required",
    unique: true,
  },
  location: {
    type: String,
    required: "Location is required",
  },
  avatar: String,
});

module.exports = mongoose.model("Vendor", VendorSchema);
