const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  location: {
    type: String,
    required: "Location is required",
  },
  email: {
    type: String,
    required: "Email address is required",
  },
  phone: {
    type: Number,
    required: "Phone number is required",
  },
});

module.exports = mongoose.model("Vendor", VendorSchema);
