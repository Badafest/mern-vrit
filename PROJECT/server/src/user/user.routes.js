const {
  verifyAccessToken,
  verifyBuyerRole,
} = require("../auth/auth.middleware");
const UserController = require("./user.controller");

const orderRouter = require("../order/order.routes");

const router = require("express").Router();

router.get("/me", verifyAccessToken, UserController.me);
router.post("/set_avatar", verifyAccessToken, UserController.setAvatar);
router.patch("/del_avatar", verifyAccessToken, UserController.delAvatar);

router.get("/cart", verifyAccessToken, verifyBuyerRole, UserController.getCart);
router.post(
  "/cart",
  verifyAccessToken,
  verifyBuyerRole,
  UserController.dumpCart
);

router.get(
  "/favorites",
  verifyAccessToken,
  verifyBuyerRole,
  UserController.getFavorites
);

router.post(
  "/favorites",
  verifyAccessToken,
  verifyBuyerRole,
  UserController.dumpFavorites
);

router.use("/order", verifyAccessToken, verifyBuyerRole, orderRouter);

module.exports = router;
