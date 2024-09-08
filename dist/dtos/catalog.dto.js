"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class catalogDto {
    constructor(data) {
        this.id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.birthday = data.birthday;
        this.parents = data.parents.map((e) => new Parent(e));
    }
}
class Parent {
    constructor(data) {
        this.id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.phoneNumber = data.phoneNumber;
        this.role = data.role;
        this.job = data.job;
    }
}
exports.default = catalogDto;
