const AuthService = require("./auth.service");

const AuthController = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const user = await AuthService.registerUser(username, password, email);
      return res.status(200).json({
        message: "Successfully registered user",
        user,
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        err.message = `${Object.keys(err.keyPattern)[0]} is already taken`;
      }
      return res.status(401).json({
        error: err.message,
      });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const { user, access_token, refresh_token } = await AuthService.loginUser(
        username,
        password
      );
      return res.status(200).json({
        message: "Successfully logged in user",
        user,
        access_token,
        refresh_token,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        error: err.message,
      });
    }
  },

  refresh: async (req, res) => {
    const { refresh_token } = req.body;
    try {
      const tokens = await AuthService.refreshTokens(refresh_token);
      return res.status(200).json({
        message: "Successfully refreshed tokens",
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        error: err.message,
      });
    }
  },

  googleAuth: async (req, res) => {
    const { id_token } = req.body;
    try {
      const { user, access_token, refresh_token } =
        await AuthService.googleAuth(id_token);
      return res.status(200).json({
        message: "Successfully authenticated google client",
        user,
        access_token,
        refresh_token,
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        err.message = `${Object.keys(err.keyPattern)[0]} is already taken`;
      }
      return res.status(401).json({
        error: err.message,
      });
    }
  },

  forgotPassword: async (req, res) => {
    const { username, email } = req.body;
    try {
      const { expiry } = await AuthService.forgotPassword(username, email);
      return res.status(200).json({
        message:
          "Please check your email for link to reset password within " +
          parseInt(expiry) +
          " minutes",
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        error: err.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    const { secret, password } = req.body;
    try {
      await AuthService.resetPassword(secret, password);
      return res.status(200).json({
        message: "Successfully reset password",
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        error: err.message,
      });
    }
  },
};

module.exports = AuthController;
