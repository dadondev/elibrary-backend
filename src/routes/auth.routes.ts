/** @format */

import e from "express";
import authController from "../controllers/auth.controller";

const authRouter = e.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.patch(
	"/edit/changePhoneNumber/:id",
	authController.changePhoneNumber
);
authRouter.put("/edit/:id", authController.edit);
authRouter.get("/forgetPassword/:id", authController.forgetPassword);
authRouter.get("/delete/:id", authController.delete);
authRouter.get("/admins/getAll", authController.getAll);

export default authRouter;
