const User = require("../user/User");
const AuthHelper = require("./auth.helper");
const validate = require("./auth.validation");

const { JWT_REFRESH, JWT_EXPIRY } = require("../config/vars");

const GAuthClient = require("../config/googleAuth");

class AuthService {
  User;
  constructor(User) {
    this.User = User;
  }

  async generateTokensAndSave(user) {
    const access_token = await AuthHelper.generateToken(
      { _id: user._id, type: "access_token" },
      { expiresIn: JWT_REFRESH }
    );

    const refresh_token = await AuthHelper.generateToken(
      { _id: user._id, type: "refresh_token" },
      { expiresIn: JWT_EXPIRY }
    );

    user.access_token = access_token;
    user.refresh_token = refresh_token;
    await user.save();
  }

  async verifyRefreshToken(refresh_token) {
    const { _id } = await AuthHelper.verifyToken(refresh_token);
    if (!_id) {
      throw new error("Not a valid refresh token");
    }

    const user = await this.User.findById(_id, "refresh_token");

    if (refresh_token !== user.refresh_token) {
      throw new Error("Not a valid refresh token");
    }

    return user;
  }

  async verifyAccessToken(access_token) {
    const { _id } = await AuthHelper.verifyToken(access_token);
    if (!_id) {
      throw new error("Not a valid access token");
    }

    const user = await this.User.findById(_id, "access_token");
    if (access_token !== user.access_token) {
      throw new Error("Not a valid access token");
    }

    return user;
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
    return { _id: user._id, username: user.username, avatar: user.avatar };
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
    if (!user.password) {
      throw new Error("Username or password is incorrect");
    }
    const isValidPassword = await AuthHelper.compareHash(
      password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Username or password is incorrect");
    }
    await this.generateTokensAndSave(user);

    return {
      user: { _id: user._id, username: user.username, avatar: user.avatar },
      access_token: user.access_token,
      refresh_token: user.refresh_token,
    };
  }

  async refreshTokens(refresh_token) {
    const user = await this.verifyRefreshToken(refresh_token);
    await this.generateTokensAndSave(user);

    return {
      access_token: user.access_token,
      refresh_token: user.refresh_token,
    };
  }

  async googleAuth(id_token) {
    const { payload } = await GAuthClient.verifyToken(id_token);
    const { email } = payload;

    let user = await this.User.findOne({ email });

    if (user) {
      user.googleAuth = true;
    } else {
      let username = email.split("@")[0];
      const isUsernameTaken = await this.User.findOne({ username });
      if (isUsernameTaken) {
        username += parseInt(username.split("_")[0]) + 1;
      }
      user = await new this.User({
        username,
        email,
        googleAuth: true,
      });
    }

    await this.generateTokensAndSave(user);

    return {
      user: { _id: user._id, username: user.username, avatar: user.avatar },
      access_token: user.access_token,
      refresh_token: user.refresh_token,
    };
  }
}

module.exports = new AuthService(User);
