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
const user_dto_1 = require("../dtos/user.dto");
const book_schema_1 = __importDefault(require("../models/book.schema"));
const borrow_schema_1 = __importDefault(require("../models/borrow.schema"));
const catalog_schema_1 = __importDefault(require("../models/catalog.schema"));
const compare_validator_1 = __importDefault(require("../validators/compare.validator"));
const sms_service_1 = __importDefault(require("./sms.service"));
const date_fns_1 = require("date-fns");
class cronService {
    examineBorrows() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const allBorrows = yield borrow_schema_1.default.find();
            const weekDay = (0, date_fns_1.format)(today, "EEEE");
            if (weekDay === "Sunday")
                return;
            allBorrows.forEach((borrow) => __awaiter(this, void 0, void 0, function* () {
                const resp = (0, compare_validator_1.default)(borrow.returnDate, today);
                if (resp === "earn")
                    return;
                if (resp === "equal")
                    return yield equalSendSMS(borrow);
                if (resp === "1 day")
                    return yield beforeAday(borrow);
                return yield lateBook(borrow);
            }));
        });
    }
}
exports.default = new cronService();
function equalSendSMS(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const existUser = yield catalog_schema_1.default.findById(borrow.userId);
        const existBook = yield catalog_schema_1.default.findById(borrow.bookId);
        const dto = new user_dto_1.takeBookDto(borrow, existUser, existBook);
        const resp = yield sms_service_1.default.returnBook(dto);
        return resp.status === 200;
    });
}
function beforeAday(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const existUser = yield catalog_schema_1.default.findById(borrow.userId);
        const existBook = yield catalog_schema_1.default.findById(borrow.bookId);
        const dto = new user_dto_1.takeBookDto(borrow, existUser, existBook);
        const resp = yield sms_service_1.default.earnReturnBook(dto);
        return resp.status === 200;
    });
}
function lateBook(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const existUser = yield catalog_schema_1.default.findById(borrow.userId);
        const existBook = yield book_schema_1.default.findById(borrow.bookId);
        const dto = new user_dto_1.takeBookDto(borrow, existUser, existBook);
        const resp = yield sms_service_1.default.lateReturnBook(dto);
        return resp.status === 200;
    });
}
