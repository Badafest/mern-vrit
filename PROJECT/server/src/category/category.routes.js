const router = require("express").Router();
const {
  verifyAccessToken,
  verifyAdminRole,
} = require("../auth/auth.middleware");
const CategoryController = require("./category.controller");

router.get("/fetch_json", CategoryController.fetchJSON);

router.post("/add", verifyAccessToken, verifyAdminRole, CategoryController.add);

router.patch(
  "/edit",
  verifyAccessToken,
  verifyAdminRole,
  CategoryController.edit
);

router.delete(
  "/delete",
  verifyAccessToken,
  verifyAdminRole,
  CategoryController.delete
);

module.exports = router;
