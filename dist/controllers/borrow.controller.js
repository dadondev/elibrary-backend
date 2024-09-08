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
const borrow_service_1 = __importDefault(require("../services/borrow.service"));
class borrowController {
    getAll(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield borrow_service_1.default.getAll();
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.json(yield borrow_service_1.default.getOne(id));
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const days = req.query.days || "10";
                const data = req.body;
                const resp = yield borrow_service_1.default.create(data, days);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    changeTakeDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const date = req.body;
                if (!date || !id)
                    throw new Error("Data is not full");
                const resp = yield borrow_service_1.default.changeTakeDate(id, date);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    changeReturnDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const date = req.body;
                if (!date || !id)
                    throw new Error("Data is not full");
                const resp = yield borrow_service_1.default.changeReturnDate(id, date);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    changeUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.body;
                if (!userId || !id)
                    throw new Error("Data is not full");
                const resp = yield borrow_service_1.default.changeUserId(id, userId);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    changeBookId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { bookId } = req.body;
                if (!bookId || !id)
                    throw new Error("Data is not full");
                const resp = yield borrow_service_1.default.changeBookId(id, bookId);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    changeSMSDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const date = req.body;
                if (!date || !id)
                    throw new Error("Data is not full");
                const resp = yield borrow_service_1.default.changeSMSDate(id, date);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    removeBorrow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.json(yield borrow_service_1.default.removeBorrow(id));
            }
            catch (error) {
                const err = error;
                return res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
}
exports.default = new borrowController();
