const bcrypt = require("bcryptjs");

const checkValidBody = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password || !username.length || !password.length) {
      throw new Error("Username and Password are required");
    }
    next();
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const hashPassword = (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      process.env.BCRYPT_SALT
    );
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { checkValidBody, hashPassword };
