import dotenv from "dotenv";
dotenv.config({});

const ENVIRONMENT = {
  NODE_ENV: process.env.NODE_ENV ?? "DEVELOPMENT",
  PORT: process.env.PORT ?? 8000,
  MONGODB_URL: process.env.MONGODB_URL ?? "mongodb://localhost:27017/chat-app",
  SALT_ROUND: parseInt(process.env.SALT_ROUND || "8"),
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",
  JWT_EXPIRY_SHORT: process.env.JWT_EXPIRY_SHORT ?? "10m",
  JWT_EXPIRY_LONG: process.env.JWT_EXPIRY_LONG ?? "7d",
};

export default ENVIRONMENT;
