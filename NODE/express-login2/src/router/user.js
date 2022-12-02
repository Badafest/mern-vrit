const {
  registerUser,
  loginUser,
  getUserData,
} = require("../user/user.controller");
const { isUserLoggedIn } = require("../user/user.middleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isUserLoggedIn, getUserData);

module.exports = router;
