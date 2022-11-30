const express = require("express");

const app = express();

app.use(express.json({}));

app.use(express.urlencoded({}));

let TODOS = [];

app.get("/todos", (req, res) => {
  res.status(200).json({
    todos: TODOS,
  });
});

app.post("/todo", (req, res) => {
  TODOS.push(req.body);
  res.status(200).json({
    message: "Todo added succesfully!",
  });
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
