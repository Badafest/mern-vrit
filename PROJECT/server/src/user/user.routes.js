const { verifyAccessToken } = require("../auth/auth.middleware");
const UserController = require("./user.controller");

const router = require("express").Router();

router.get("/me", verifyAccessToken, UserController.me);
router.post("/set_avatar", verifyAccessToken, UserController.setAvatar);
router.patch("/del_avatar", verifyAccessToken, UserController.delAvatar);

module.exports = router;
