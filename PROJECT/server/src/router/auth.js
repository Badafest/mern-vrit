const AuthController = require("../auth/auth.controller");

const router = require("express").Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/google_auth", AuthController.googleAuth);

module.exports = router;
