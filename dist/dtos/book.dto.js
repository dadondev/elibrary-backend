"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
class bookDto {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.author = data.author;
        this.pagesCount = data.pagesCount;
        this.status = data.status;
        this.borrowId = data.borrowId;
    }
}
exports.default = bookDto;
