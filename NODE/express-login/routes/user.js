const express = require("express");

const { loginUser, registerUser } = require("../controllers/user");
const { checkValidBody } = require("../middlewares/user");

const router = express.Router();

router.post("/login", checkValidBody, loginUser);
router.post("/register", checkValidBody, registerUser);

router.get("*", (_, res) => {
  res.status(200).json({
    message: "Please only use POST method",
  });
});

module.exports = router;
