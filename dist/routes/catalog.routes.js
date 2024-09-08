"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalog_controllers_1 = __importDefault(require("../controllers/catalog.controllers"));
const catalogRouter = express_1.default.Router();
catalogRouter.get("/getAll", catalog_controllers_1.default.getAll);
catalogRouter.get("/getOne/:id", catalog_controllers_1.default.getOne);
catalogRouter.post("/create", catalog_controllers_1.default.create);
catalogRouter.put("/edit/:id", catalog_controllers_1.default.edit);
catalogRouter.post("/:id/addParent", catalog_controllers_1.default.addParent);
catalogRouter.delete("/delete/:id", catalog_controllers_1.default.delete);
exports.default = catalogRouter;
