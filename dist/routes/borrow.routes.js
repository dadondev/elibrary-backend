"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = __importDefault(require("../controllers/borrow.controller"));
const borrowRouter = express_1.default.Router();
borrowRouter.get("/getAll", borrow_controller_1.default.getAll);
borrowRouter.get("/getOne/:id", borrow_controller_1.default.getOne);
borrowRouter.post("/create", borrow_controller_1.default.create);
borrowRouter.delete("/delete/:id", borrow_controller_1.default.removeBorrow);
borrowRouter.patch("/changeBookId/:id", borrow_controller_1.default.changeBookId);
borrowRouter.patch("/changeReturnDate/:id", borrow_controller_1.default.changeReturnDate);
borrowRouter.patch("/changeSMSDate/:id", borrow_controller_1.default.changeSMSDate);
borrowRouter.patch("/changeTakeDate/:id", borrow_controller_1.default.changeTakeDate);
borrowRouter.patch("/changeUserId/:id", borrow_controller_1.default.changeUserId);
exports.default = borrowRouter;
