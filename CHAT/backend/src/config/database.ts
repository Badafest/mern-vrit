import mongoose from "mongoose";
import ENVIRONMENT from "./vars";

interface IDbConnection {
  connectToDb: () => Promise<void>;
  disconnect: () => Promise<void>;
}

class DbConnection implements IDbConnection {
  constructor() {
    mongoose.set({ strictQuery: false });
  }

  async connectToDb() {
    await mongoose.connect(ENVIRONMENT.MONGODB_URL);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}

export default DbConnection;
