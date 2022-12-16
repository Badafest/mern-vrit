const router = require("express").Router();

const AuthRouter = require("../auth/auth.routes");
const UserRouter = require("../user/user.routes");
const CategoryRouter = require("../category/category.routes");

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/category", CategoryRouter);

module.exports = router;
