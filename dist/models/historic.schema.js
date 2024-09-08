"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historicSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
    },
    bookId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
    },
    takeDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
});
exports.default = mongoose_1.default.model("historic", historicSchema);
