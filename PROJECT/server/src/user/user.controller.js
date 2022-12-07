const userService = require("./user.service");

const UserController = {
  me: async (req, res) => {
    try {
      const user = await userService.getUserData(req._id);
      return res.status(200).json({
        message: "Successfully fetched user data",
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
      });
    }
  },
};

module.exports = UserController;
