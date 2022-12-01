const express = require("express");

const { loginUser, registerUser } = require("../controllers/UserController");
const { checkValidBody, hashPassword } = require("../middlewares/user");

const router = express.Router();

router.post("/login", checkValidBody, hashPassword, loginUser);
router.post("/register", checkValidBody, hashPassword, registerUser);

router.get("*", (_, res) => {
  res.status(200).json({
    message: "Please only use POST method",
  });
});

module.exports = router;
