const router = require("express").Router();

const AuthRouter = require("./auth");
const UserRouter = require("./user");

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);

module.exports = router;
