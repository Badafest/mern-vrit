const { verifyAccessToken } = require("../auth/auth.middleware");
const UserController = require("../user/user.controller");

const router = require("express").Router();

router.get("/me", verifyAccessToken, UserController.me);

module.exports = router;
