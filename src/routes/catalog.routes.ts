/** @format */

import express from "express";
import catalogControllers from "../controllers/catalog.controllers";

const catalogRouter = express.Router();

catalogRouter.get("/getAll", catalogControllers.getAll);
catalogRouter.get("/getOne/:id", catalogControllers.getOne);
catalogRouter.post("/create", catalogControllers.create);
catalogRouter.put("/edit/:id", catalogControllers.edit);
catalogRouter.post("/:id/addParent", catalogControllers.addParent);
catalogRouter.delete("/delete/:id", catalogControllers.delete)


export default catalogRouter;
