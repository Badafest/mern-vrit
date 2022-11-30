const { register, login } = require("../models/UserModel");

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    await register(user);
    res.status(200).json({
      message: "Successfully registered! Proceed to login",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = req.body;
    await login(user);
    res.status(200).json({
      message: "Successfully logged in!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
