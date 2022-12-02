const User = require("./user.model");
const { hashPassword, compareHash, generateToken } = require("./user.services");

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password, bio } = req.body;
      if (
        !username ||
        !password ||
        !email ||
        !username.length ||
        !password.length ||
        !email.length
      ) {
        return res.status(400).json({
          error: "Username, Email and Password are required",
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await new User({
        username,
        email,
        password: hashedPassword,
        bio,
      }).save();

      res.status(200).json({
        message: "Successfully registered user",
        user: JSON.parse(
          JSON.stringify({ ...user._doc, password: null, email: null })
        ),
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
      if (!username || !password || !username.length || !password.length) {
        return res.status(400).json({
          error: "Username and Password are required",
        });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          error: "Username or Password is incorrect",
        });
      }

      const isPasswordCorrect = await compareHash(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          error: "Username or Password is incorrect",
        });
      }
      const token = await generateToken({ username });

      res.status(200).json({
        message: "Successfully logged in user",
        user: JSON.parse(
          JSON.stringify({ ...user._doc, password: null, email: null })
        ),
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  getUserData: async (req, res) => {
    const user = await User.findOne({ username: req.user });
    if (!user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    return res.status(200).json({
      user: { ...user._doc, password: null },
    });
  },
};

module.exports = UserController;
