require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  PORT: process.env.PORT,
  CLIENT_URI: process.env.CLIENT_URI,
};
