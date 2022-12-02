const express = require("express");
const router = require("../router");

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use("*", (_, res) => {
  res.status(404).json({
    error: "Resource not found",
  });
});

module.exports = app;
