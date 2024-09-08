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
const types_1 = require("../utils/types");
const date_fns_1 = __importDefault(require("date-fns"));
const utils_1 = require("../utils/utils");
const textflow_service_1 = __importDefault(require("./textflow.service"));
class smsService {
    welcomeSMS(phoneNumber, fullName) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = `Assalomu alaykum, ${fullName}!\nSiz markaziy kutubxonada yangi katalog ochdirdingiz! Buni eslatib o'tishimiz lozim edi! E'tibor uchun katta rahmat :)`;
            return yield (0, textflow_service_1.default)(phoneNumber, msg);
        });
    }
    takeBook(_a) {
        return __awaiter(this, arguments, void 0, function* ({ bookName, fullName, phoneNumber, returnDate }) {
            const msg = `Assalomu alaykum, ${fullName}!\nSiz markaziy kutubxonadan ${bookName} nomli kitob oldingiz!\n Topshirish sanasi: ${date_fns_1.default.getDate(returnDate)}-${types_1.months[date_fns_1.default.getMonth(returnDate) - 1].toLowerCase()}` + info;
            return yield (0, textflow_service_1.default)(phoneNumber, msg);
        });
    }
    returnBook(_a) {
        return __awaiter(this, arguments, void 0, function* ({ fullName, bookName, phoneNumber, takeDate }) {
            const msg = `Assalomu alaykum, ${fullName}!\nEslatib o'tamiz! Siz markaziy kutubxonadan ${date_fns_1.default.getDate(takeDate)}-${types_1.months[date_fns_1.default.getMonth(takeDate)].toLowerCase()} kuni ${bookName} nomli kitob olgan edingiz! Bugun sizga berilgan muhlat tugadi! Iltimos kitobni qaytarishingizni so'raymiz!` +
                info;
            return yield (0, textflow_service_1.default)(phoneNumber, msg);
        });
    }
    earnReturnBook(_a) {
        return __awaiter(this, arguments, void 0, function* ({ fullName, takeDate, bookName, phoneNumber, }) {
            const msg = `Assalomu alaykum, ${fullName}!\n Eslatib o'tamiz! Siz markaziy kutubxonadan ${date_fns_1.default.getDate(takeDate)}-${types_1.months[date_fns_1.default.getMonth(takeDate)].toLowerCase()} kuni ${bookName} nomli kitob olgan edingiz! Sizga berilgan muhlat ertaga tugaydi. Shuning uchun ertaga kitobni olib kelishingizni so'raymiz!` +
                info;
            return yield (0, textflow_service_1.default)(phoneNumber, msg);
        });
    }
    lateReturnBook(_a) {
        return __awaiter(this, arguments, void 0, function* ({ fullName, phoneNumber, bookName }) {
            const msg = `Assalomu alaykum, ${fullName}!\n Siz markaziy kutubxonadan ${bookName} nomli kiton olgan edingiz! Afsuski sizga berilgan muhlat allaqachon tugagan zudlik bilan kitobni qaytarishingizni so'raymiz?` +
                info;
            return yield (0, textflow_service_1.default)(phoneNumber, msg);
        });
    }
}
exports.default = new smsService();
const info = "\nAgar kitobning muddati uzaytirmoqchi bo'lsangiz telefon orqali ogohlantirishingizni so'raymiz!\nMurojat uchun: " +
    utils_1.PHONE_NUMBER;
