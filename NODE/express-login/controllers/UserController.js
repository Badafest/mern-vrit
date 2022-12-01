const User = require("../models/User");

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await new User({ username, password }).save();
      return res.status(200).json({
        message: "Successfully registered! Proceed to login",
        user_id: user._id,
      });
    } catch (err) {
      if (err.code === 11000) {
        err.message = "Username is already taken";
      }
      return res.status(500).json({
        error: err.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.find({ username, password });
      if (!user.length) {
        return res.status(500).json({
          error: "Username or Password is incorrect",
        });
      }
      return res.status(200).json({
        message: "Successfully logged in",
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },
};

module.exports = UserController;
