"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = __importDefault(require("../services/book.service"));
class bookController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resp = yield book_service_1.default.create(data);
                return res.json(resp);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const resp = yield book_service_1.default.edit(id, data);
                return res.json(resp);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield book_service_1.default.delete(id);
                return res.status(200).json(data);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
    getAll(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield book_service_1.default.getAll();
                return res.status(200).json(datas);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resp = yield book_service_1.default.getOne(id);
                return res.json(resp);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, borrowId } = req.query;
                const resp = yield book_service_1.default.changeStatus(id, status, borrowId);
                return res.json(resp);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
    changeBorrowId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { borrowId } = req.query;
                const resp = yield book_service_1.default.changeBorrowId(id, borrowId);
                return res.status(200).json(resp);
            }
            catch (error) {
                const { message } = error;
                res.status(400).json({
                    message,
                    statusCode: 400,
                });
            }
        });
    }
}
exports.default = new bookController();
