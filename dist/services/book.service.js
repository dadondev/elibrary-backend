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
const book_dto_1 = __importDefault(require("../dtos/book.dto"));
const book_schema_1 = __importDefault(require("../models/book.schema"));
const book_validator_1 = __importDefault(require("../validators/book.validator"));
class bookService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = book_validator_1.default.validateSync(data);
            const newBook = yield book_schema_1.default.create(validatedData);
            return new book_dto_1.default(newBook);
        });
    }
    edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = book_validator_1.default.validateSync(data);
            const existBook = yield book_schema_1.default.findByIdAndUpdate(id, validatedData, {
                new: true,
            });
            return new book_dto_1.default(existBook);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allDatas = yield book_schema_1.default.find();
            return allDatas.map((e) => new book_dto_1.default(e));
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_schema_1.default.findById(id);
            return new book_dto_1.default(book);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_schema_1.default.findByIdAndDelete(id);
            return new book_dto_1.default(book);
        });
    }
    changeStatus(id, status, borrowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_schema_1.default.findById(id);
            if (!book)
                throw new Error("Book is not found");
            if (status === "free") {
                book.status = status;
                book.borrowId = "";
            }
            else if (status === "missing") {
                book.borrowId = "";
            }
            else if (borrowId) {
                book.borrowId = borrowId;
            }
            yield book.save();
            return new book_dto_1.default(book);
        });
    }
    changeBorrowId(id, borrowId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!borrowId || !id)
                throw new Error("borrowId must be");
            const book = yield book_schema_1.default.findByIdAndUpdate(id, { borrowId });
            return new book_dto_1.default(book);
        });
    }
}
exports.default = new bookService();
