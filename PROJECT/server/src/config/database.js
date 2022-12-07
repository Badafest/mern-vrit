const mongoose = require("mongoose");
const { MONGO_URI } = require("./vars");

class DBConnection {
  URI;
  constructor(uri) {
    this.URI = uri;
  }
  connect() {
    throw new Error("Should be called from derived class only");
  }
}

class MongoConnection extends DBConnection {
  constructor(uri) {
    super(uri);
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        mongoose.set("strictQuery", false);
        mongoose.connect(this.URI, () => {
          resolve(true);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = { MongoConnection: new MongoConnection(MONGO_URI) };
