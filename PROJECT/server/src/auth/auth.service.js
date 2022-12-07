const User = require("../user/User");
const AuthHelper = require("./auth.helper");
const validate = require("./auth.validation");

const { JWT_REFRESH, JWT_EXPIRY } = require("../config/vars");

class AuthService {
  User;
  constructor(User) {
    this.User = User;
  }

  async registerUser(username, password, email) {
    const isValid = validate(username, password, email);
    if (!isValid) {
      throw new Error("Username, password and email are required");
    }
    const hash = await AuthHelper.hashPassword(password);
    const user = await new this.User({
      username,
      email,
      password: hash,
    }).save();
    return { ...user._doc, password: null, email: null };
  }

  async loginUser(username, password) {
    const isValid = validate(username, password);
    if (!isValid) {
      throw new Error("Username and password are required");
    }
    const user = await this.User.findOne({ username });
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    const isValidPassword = await AuthHelper.compareHash(
      password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Username or password is incorrect");
    }
    const access_token = await AuthHelper.generateToken(
      { _id: user._id },
      { expiresIn: JWT_REFRESH }
    );
    const refresh_token = await AuthHelper.generateToken(
      { _id: user._id },
      { expiresIn: JWT_EXPIRY }
    );
    return {
      user: { ...user._doc, password: null, email: null },
      access_token,
      refresh_token,
    };
  }

  async refreshTokens(refresh_token) {
    const { _id } = await AuthHelper.verifyToken(refresh_token);
    if (!_id) {
      throw new error("Not a valid refresh token");
    }
    const user = await this.User.findById(_id, "last_token");
    if (refresh_token === user.last_token) {
      throw new Error("Token already used once");
    }
    user.last_token = refresh_token;
    await user.save();
    const access_token = await AuthHelper.generateToken(
      { _id: user._id },
      { expiresIn: JWT_REFRESH }
    );
    const new_refresh_token = await AuthHelper.generateToken(
      { _id: user._id },
      { expiresIn: JWT_EXPIRY }
    );
    return {
      access_token,
      refresh_token: new_refresh_token,
    };
  }
}

module.exports = new AuthService(User);
