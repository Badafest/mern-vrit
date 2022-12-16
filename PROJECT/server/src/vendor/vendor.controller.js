const vendorService = require("./vendor.service");

const VendorController = {
  add: async (req, res) => {
    try {
      const vendor = await vendorService.add(...req.body);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = VendorController;
