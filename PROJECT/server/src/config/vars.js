require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  SECRET_EXPIRY: process.env.SECRET_EXPIRY,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  PORT: process.env.PORT,
  CLIENT_URI: process.env.CLIENT_URI,
  GAUTH_CLIENT_ID: process.env.GAUTH_CLIENT_ID,
  GAUTH_CLIENT_SECRET: process.env.GAUTH_CLIENT_SECRET,
  GAUTH_REDIRECT_URI: process.env.GAUTH_REDIRECT_URI,
  CN_CLOUD_NAME: process.env.CN_CLOUD_NAME,
  CN_API_KEY: process.env.CN_API_KEY,
  CN_API_SECRET: process.env.CN_API_SECRET,
};
