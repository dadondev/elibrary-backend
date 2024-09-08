"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = __importDefault(require("date-fns"));
function compareDate(returnDate, todayDate) {
    const firstDate = date_fns_1.default.getDate(returnDate) +
        ":" +
        date_fns_1.default.getMonth(returnDate) +
        ":" +
        date_fns_1.default.getYear(returnDate);
    const secondDate = date_fns_1.default.getDate(todayDate) +
        ":" +
        date_fns_1.default.getMonth(todayDate) +
        ":" +
        date_fns_1.default.getYear(todayDate);
    if (date_fns_1.default.getDate(todayDate) - date_fns_1.default.getDate(returnDate) === 1 &&
        date_fns_1.default.getMonth(todayDate) === date_fns_1.default.getMonth(returnDate) &&
        date_fns_1.default.getYear(todayDate) === date_fns_1.default.getYear(returnDate))
        return "1 day";
    if (firstDate < secondDate)
        return "earn";
    if (firstDate === secondDate)
        return "equal";
    return "late";
}
exports.default = compareDate;
