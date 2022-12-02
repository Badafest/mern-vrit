const app = require("./src/config/express");
const { connectMongo } = require("./src/config/database");
const { PORT } = require("./src/config/vars");

(async () => {
  try {
    await connectMongo();
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log("DB CONNECTION FAILED WITH ERROR => ", err);
  }
})();

app.listen(PORT, () => {
  console.log("SERVER LISTENING ON PORT", PORT);
});
