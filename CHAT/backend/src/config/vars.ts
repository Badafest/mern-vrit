import dotenv from "dotenv";
dotenv.config({});

const ENVIRONMENT = {
  NODE_ENV: process.env.NODE_ENV ?? "DEVELOPMENT",
  PORT: process.env.PORT ?? 8000,
  MONGODB_URL: process.env.MONGODB_URL ?? "mongodb://localhost:27017/chat-app",
};

export default ENVIRONMENT;
