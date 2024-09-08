"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeBookDto = void 0;
class takeBookDto {
    constructor(data, user, book) {
        this.phoneNumber = data.phoneNumber;
        this.bookName = book.name;
        this.fullName = `${user.lastName} ${user.firstName}`;
        this.takeDate = data.takeDate;
        this.returnDate = data.returnDate;
    }
}
exports.takeBookDto = takeBookDto;
