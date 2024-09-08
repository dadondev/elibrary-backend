/** @format */

import e from "express";
import bookController from "../controllers/book.controller";

const bookRouter = e.Router();

bookRouter.post("/create", bookController.create);
bookRouter.put("/edit/:id", bookController.edit);
bookRouter.delete("/delete/:id", bookController.delete);
bookRouter.get("/getAll", bookController.getAll);
bookRouter.get("/getOne/:id", bookController.delete);
bookRouter.get("/changeStatus/:id", bookController.changeStatus);
bookRouter.get("/changeBorrowId/:id", bookController.changeBorrowId);

export default bookRouter;
