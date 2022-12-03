const {
  attemptRegister,
  attemptLogin,
  attemptUserData,
} = require("./user.services");

const UserController = {
  registerUser: async (req, res) => {
    const { username, email, password, bio } = req.body;
    try {
      const { user } = await attemptRegister(username, email, password, bio);
      res.status(200).json({
        message: "Successfully registered user",
        user,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).json({
          error: "Username or Email is already taken",
        });
      }
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const { token, user } = await attemptLogin(username, password);
      res.status(200).json({
        message: "Successfully logged in user",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  getUserData: async (req, res) => {
    try {
      const user = await attemptUserData(req.body.username);
      res.status(200).json({
        message: "Successfully fetched user data!",
        user,
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
