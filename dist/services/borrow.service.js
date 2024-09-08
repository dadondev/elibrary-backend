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
const borrow_dto_1 = __importDefault(require("../dtos/borrow.dto"));
const borrow_schema_1 = __importDefault(require("../models/borrow.schema"));
const borrow_validator_1 = __importDefault(require("../validators/borrow.validator"));
const date_fns_1 = __importDefault(require("date-fns"));
const book_schema_1 = __importDefault(require("../models/book.schema"));
const catalog_schema_1 = __importDefault(require("../models/catalog.schema"));
const types_1 = require("util/types");
const historic_schema_1 = __importDefault(require("../models/historic.schema"));
class borrowService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = yield borrow_schema_1.default.find();
            return datas.map((e) => new borrow_dto_1.default(e));
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield borrow_schema_1.default.findById(id);
            return new borrow_dto_1.default(data);
        });
    }
    create(data, days) {
        return __awaiter(this, void 0, void 0, function* () {
            let validatedData = borrow_validator_1.default.validateSync(data);
            validatedData.takeDate = new Date();
            validatedData.returnDate = new Date(date_fns_1.default.addDays(new Date(), +days).getTime());
            const book = yield book_schema_1.default.findById(validatedData.bookId);
            const catalog = yield catalog_schema_1.default.findById(validatedData.userId);
            if (!catalog)
                throw new Error("The catalog is not found");
            if (!book)
                throw new Error("The book is not found");
            if (book.status === "borrowed")
                throw new Error("The book already borrowed");
            if (book.status === "missing")
                throw new Error("The book is missing");
            book.status = "borrowed";
            yield book.save();
            const newBorrow = yield borrow_schema_1.default.create(validatedData);
            return new borrow_dto_1.default(newBorrow);
        });
    }
    changeTakeDate(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const existBorrow = yield borrow_schema_1.default.findByIdAndUpdate(id, {
                takeDate: date,
            });
            if (!existBorrow)
                throw new Error("The borrow is not found");
            return new borrow_dto_1.default(existBorrow);
        });
    }
    changeReturnDate(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const existBorrow = yield borrow_schema_1.default.findByIdAndUpdate(id, {
                returnDate: date,
            });
            if (!existBorrow)
                throw new Error("The borrow is not found");
            return new borrow_dto_1.default(existBorrow);
        });
    }
    changeUserId(borrowId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCatalog = yield catalog_schema_1.default.findById(userId);
            if (!existCatalog)
                throw new Error("Catalog not found");
            const existBorrow = yield borrow_schema_1.default.findByIdAndUpdate(borrowId, {
                userId,
            });
            return new borrow_dto_1.default(existBorrow);
        });
    }
    changeBookId(borrowId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existBorrow = yield borrow_schema_1.default.findById(borrowId);
            if (!existBorrow)
                throw new Error("The borrow is not found");
            try {
                const existPrevBook = yield book_schema_1.default.findById(existBorrow.bookId);
                existPrevBook.status = "free";
                yield existPrevBook.save();
            }
            catch (error) {
                console.log(error);
            }
            existBorrow.bookId = bookId;
            yield existBorrow.save();
            return new borrow_dto_1.default(existBorrow);
        });
    }
    changeSMSDate(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const existBorrow = yield borrow_schema_1.default.findById(id);
            if (!existBorrow)
                throw new Error("The borror is not found");
            if (!(0, types_1.isDate)(date))
                throw new Error("Your date is not equal to Date type");
            existBorrow.sendSMS = date;
            yield existBorrow.save();
            return new borrow_dto_1.default(existBorrow);
        });
    }
    removeBorrow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existBorrow = yield borrow_schema_1.default.findByIdAndDelete(id);
            if (!existBorrow)
                throw new Error("The borror is not found");
            try {
                yield book_schema_1.default.findByIdAndUpdate(existBorrow.bookId, {
                    status: "free",
                });
                yield historic_schema_1.default.create(existBorrow);
            }
            catch (error) {
                console.log(error);
            }
            return new borrow_dto_1.default(existBorrow);
        });
    }
}
exports.default = new borrowService();
