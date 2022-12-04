const { hashPassword, generateToken, compareHash } = require("./user.helpers");
const User = require("./user.model");

const attemptRegister = async (username, email, password, bio) => {
  if (
    !username ||
    !password ||
    !email ||
    !username.length ||
    !password.length ||
    !email.length
  ) {
    throw new Error("Username, Email and Password are required");
  }

  const hashedPassword = await hashPassword(password);

  const user = await new User({
    username,
    email,
    password: hashedPassword,
    bio,
  }).save();

  const registeredUser = { ...user._doc, password: null, email: null };
  return { user: registeredUser };
};

const attemptLogin = async (username, password) => {
  if (!username || !password || !username.length || !password.length) {
    throw new Error("Username and Password are required");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Username or Password is incorrect");
  }

  const isPasswordCorrect = await compareHash(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Username or Password is incorrect");
  }

  const token = await generateToken({ user: user._id });
  const loggedInUser = { ...user._doc, password: null, email: null };

  return { user: loggedInUser, token };
};

const fetchUserData = async (_id) => {
  const user = await User.findById(_id, "-password");
  if (!user) {
    throw new Error("No user found");
  }
  return { user };
};

module.exports = { attemptRegister, attemptLogin, fetchUserData };
