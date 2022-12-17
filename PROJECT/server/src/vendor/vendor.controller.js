const vendorService = require("./vendor.service");

const VendorController = {
  add: async (req, res) => {
    try {
      const { name, location, email, phone, avatar } = req.body;
      const vendor = await vendorService.add(
        name,
        location,
        email,
        phone,
        avatar
      );
      return res.status(200).json({
        message: "Successfully added vendor",
        vendor,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        error.message = `${Object.keys(error.keyPattern)[0]} is already taken`;
      }
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  fetchAll: async (_, res) => {
    try {
      const vendors = await vendorService.fetchAll();
      return res.status(200).json({
        message: "Successfully fetched vendors",
        vendors,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  edit: async (req, res) => {
    try {
      const { name, new_name, new_location, new_email, new_phone, new_avatar } =
        req.body;
      const vendor = await vendorService.edit(
        name,
        new_name,
        new_location,
        new_email,
        new_phone,
        new_avatar
      );
      return res.status(200).json({
        message: "Successfully edited vendor",
        vendor,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        error.message = `${Object.keys(error.keyPattern)[0]} is already taken`;
      }
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      await vendorService.delete(req.body.name);
      return res.status(200).json({
        message:
          "Successfully deleted vendor. Note that the products using this vendor will be orphaned.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = VendorController;
