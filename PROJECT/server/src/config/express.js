const express = require("express");
const router = require("../router");
const cors = require("cors");
const { CLIENT_URI } = require("./vars");

const app = express();

app.use(express.json({ limit: "510kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({}));

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin === CLIENT_URI) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by cors"));
//       }
//     },
//   })
// );

app.use("/api/v1", router);

app.use("*", (_, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports = app;
