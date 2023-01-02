const router = require("express").Router();
const {
  verifyAccessToken,
  verifyAdminRole,
} = require("../auth/auth.middleware");
const ProductController = require("./product.controller");

router.get("/fetch_random", ProductController.fetchRandom);

router.post("/fetch_filtered", ProductController.fetchFiltered);

router.get("/fetch_by_id/:_id", ProductController.fetchById);

router.get("/search", ProductController.search);

router.get(
  "/fetch_all",
  verifyAccessToken,
  verifyAdminRole,
  ProductController.fetchAll
);

router.post("/add", verifyAccessToken, verifyAdminRole, ProductController.add);

router.patch(
  "/edit",
  verifyAccessToken,
  verifyAdminRole,
  ProductController.edit
);

router.delete(
  "/delete",
  verifyAccessToken,
  verifyAdminRole,
  ProductController.delete
);

module.exports = router;
