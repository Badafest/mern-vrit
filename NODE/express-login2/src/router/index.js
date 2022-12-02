const router = require("express").Router();

const UserRouter = require("./user");

router.use("/user", UserRouter);

module.exports = router;
