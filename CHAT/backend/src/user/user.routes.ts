import express from "express";
import UserController from "./user.controller";

const router = express.Router();

router.post("/", UserController.create);

export default router;
