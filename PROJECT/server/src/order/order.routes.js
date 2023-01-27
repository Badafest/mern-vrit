const OrderController = require("./order.controller");

const router = require("express").Router();

router.get("/", OrderController.getOrder);

router.post("/", OrderController.addOrder);

router.post("/review", OrderController.addReview);

router.patch("/pay", OrderController.payOrder);

router.patch("/confirm", OrderController.confirmOrder);

module.exports = router;
