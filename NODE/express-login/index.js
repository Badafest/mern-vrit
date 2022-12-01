const express = require("express");
const router = require("./routes");

require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) {
    return console.log("DB CONNECTION FAILED WITH ERROR =>", err);
  }
  return console.log("DB CONNECTED SUCCESSFULLY!");
});

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use("*", (_, res) =>
  res.status(404).json({
    error: "Not Found",
  })
);

app.listen(8000, () => {
  console.log("SERVER LISTENING ON PORT 8000");
});
