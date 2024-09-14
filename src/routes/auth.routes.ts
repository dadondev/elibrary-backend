/** @format */

import e from "express";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = e.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.patch(
	"/edit/changePhoneNumber/:id",
	authMiddleware,
	authController.changePhoneNumber
);
authRouter.put("/edit/:id", authMiddleware, authController.edit);
authRouter.get("/forgetPassword/:id", authController.forgetPassword);
authRouter.get("/delete/:id", authMiddleware, authController.delete);
authRouter.get("/admins/getAll", authMiddleware, authController.getAll);

export default authRouter;
