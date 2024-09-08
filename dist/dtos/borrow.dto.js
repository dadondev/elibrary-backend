"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
class borrowDto {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.bookId = data.bookId;
        this.takeDate = data.takeDate;
        this.returnDate = data.returnDate;
        this.status = data.status;
        this.sendSMS = data.sendSMS;
    }
}
exports.default = borrowDto;
