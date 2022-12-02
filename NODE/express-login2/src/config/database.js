const mongoose = require("mongoose");
const { MONGO_URI } = require("./vars");

const connectMongo = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URI, (err) => {
      if (err) {
        reject(err);
      }
    });
    resolve();
  });

module.exports = { connectMongo };
