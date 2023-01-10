import express from "express";
import UserController from "./user.controller";

const router = express.Router();

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.post("/refresh", UserController.refresh);

export default router;
