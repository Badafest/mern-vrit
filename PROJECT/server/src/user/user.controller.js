const userService = require("./user.service");

const UserController = {
  me: async (req, res) => {
    try {
      const user = await userService.getUserData(req._id);
      return res.status(200).json({
        message: "Successfully fetched user data",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  setAvatar: async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        throw new Error("No image passed");
      }
      const url = await userService.setAvatar(req._id, image);
      return res.status(200).json({
        message: "Successfully set user avatar",
        image: url,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  delAvatar: async (req, res) => {
    try {
      await userService.delAvatar(req._id);
      return res.status(200).json({
        message: "Successfully deleted user avatar",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  dumpCart: async (req, res) => {
    try {
      const { cart } = req.body;
      await userService.dumpCart(req._id, cart);
      return res.status(200).json({
        message: "Successfully dumped cart",
        cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await userService.getCart(req._id);
      return res.status(200).json({
        message: "Successfully fetched cart",
        cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
