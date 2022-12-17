const router = require("express").Router();
const {
  verifyAccessToken,
  verifyAdminRole,
} = require("../auth/auth.middleware");
const ProductController = require("./product.controller");

router.get("/fetch_all", ProductController.fetchAll);

router.post("/add", verifyAccessToken, verifyAdminRole, ProductController.add);

module.exports = router;
