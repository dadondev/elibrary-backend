/** @format */

import e from "express";
import borrowController from "../controllers/borrow.controller";
const borrowRouter = e.Router();

borrowRouter.get("/getAll", borrowController.getAll);
borrowRouter.get("/getOne/:id", borrowController.getOne);
borrowRouter.post("/create", borrowController.create);
borrowRouter.delete("/delete/:id", borrowController.removeBorrow);
borrowRouter.patch("/changeBookId/:id", borrowController.changeBookId);
borrowRouter.patch("/changeReturnDate/:id", borrowController.changeReturnDate);
borrowRouter.patch("/changeSMSDate/:id", borrowController.changeSMSDate);
borrowRouter.patch("/changeTakeDate/:id", borrowController.changeTakeDate);
borrowRouter.patch("/changeUserId/:id", borrowController.changeUserId);

export default borrowRouter;
