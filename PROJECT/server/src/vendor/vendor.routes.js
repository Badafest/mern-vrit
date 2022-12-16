const VendorController = require("./vendor.controller");
const {
  verifyAccessToken,
  verifyAdminRole,
} = require("../auth/auth.middleware");

const router = require("express").Router();

router.get("/fetch_all", VendorController.fetchAll);

router.post("/add", verifyAccessToken, verifyAdminRole, VendorController.add);

router.patch(
  "/edit",
  verifyAccessToken,
  verifyAdminRole,
  VendorController.edit
);

router.delete(
  "/delete",
  verifyAccessToken,
  verifyAdminRole,
  VendorController.delete
);

module.exports = router;
