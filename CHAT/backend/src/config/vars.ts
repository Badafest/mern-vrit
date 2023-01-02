import dotenv from "dotenv";
dotenv.config({});

const ENVIRONMENT = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

export default ENVIRONMENT;
