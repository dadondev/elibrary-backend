/** @format */

import { Document } from "mongoose";

export interface takeBookI {
	phoneNumber: string;
	bookName: string;
	fullName: string;
	returnDate: string;
}

export interface returnBookI {
	phoneNumber: string;
	bookName: string;
	fullName: string;
	returnDate: Date;
	takeDate: Date;
}

export const months = [
	"Yanvar",
	"Fevral",
	"Aprel",
	"May",
	"Iyun",
	"Iyul",
	"Avgust",
	"Sentabr",
	"Oktabr",
	"Noyabr",
	"Dekabr",
];

export interface borrowI extends Document {
	bookId: string;
	userId: string;
	takeDate: Date;
	returnDate: Date;
	status: "earn" | "late";
	sendSMS: Date;
}
