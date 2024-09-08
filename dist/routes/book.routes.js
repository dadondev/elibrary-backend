"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const bookRouter = express_1.default.Router();
bookRouter.post("/create", book_controller_1.default.create);
bookRouter.put("/edit/:id", book_controller_1.default.edit);
bookRouter.delete("/delete/:id", book_controller_1.default.delete);
bookRouter.get("/getAll", book_controller_1.default.getAll);
bookRouter.get("/getOne/:id", book_controller_1.default.delete);
bookRouter.get("/changeStatus/:id", book_controller_1.default.changeStatus);
bookRouter.get("/changeBorrowId/:id", book_controller_1.default.changeBorrowId);
exports.default = bookRouter;
