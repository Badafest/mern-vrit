const router = require("express").Router();

const UserRouter = require("./UserRouter");

router.use("/user", UserRouter);

module.exports = router;
