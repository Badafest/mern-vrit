const AuthController = require("./auth.controller");

const router = require("express").Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/google_auth", AuthController.googleAuth);
router.post("/reset_password", AuthController.resetPassword);
router.post("/forgot_password", AuthController.forgotPassword);

module.exports = router;
