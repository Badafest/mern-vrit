const express = require("express");

const userRouter = require("./routes/user");

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.use("*", (_, res) =>
  res.status(404).json({
    error: "Not Found",
  })
);

app.listen(8000, () => {
  console.log("SERVER LISTENING ON PORT 8000");
});
