const cloudinary = require("./config/cloudinary");
const { MongoConnection } = require("./config/database");
const app = require("./config/express");

const { PORT } = require("./config/vars");

(async () => {
  try {
    await MongoConnection.connect();
    console.log("MONGO CONNECTION SUCCESSFULL");
  } catch (err) {
    console.log("MONGO CONNECTION FAILED =>", err);
  }
  app.listen(PORT, () => {
    console.log("SERVER LISTENING ON PORT", PORT);
  });
})();
