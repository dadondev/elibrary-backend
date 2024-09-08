/** @format */

import { takeBookDto } from "../dtos/user.dto";
import bookSchema from "../models/book.schema";
import borrowSchema from "../models/borrow.schema";
import catalogSchema from "../models/catalog.schema";
import { borrowI } from "../utils/types";
import compareDate from "../validators/compare.validator";
import smsService from "./sms.service";
import { format } from "date-fns";

class cronService {
	async examineBorrows() {
		const today = new Date();
		const allBorrows = await borrowSchema.find();
		const weekDay = format(today, "EEEE");
		if (weekDay === "Sunday") return;
		allBorrows.forEach(async (borrow) => {
			const resp = compareDate(borrow.returnDate, today);
			if (resp === "earn") return;
			if (resp === "equal") return await equalSendSMS(borrow as any);
			if (resp === "1 day") return await beforeAday(borrow as any);
			return await lateBook(borrow as any);
		});
	}
}
export default new cronService();

async function equalSendSMS(borrow: borrowI) {
	const existUser = await catalogSchema.findById(borrow.userId);
	const existBook = await catalogSchema.findById(borrow.bookId);
	const dto = new takeBookDto(borrow, existUser, existBook);
	const resp = await smsService.returnBook(dto);
	return resp.status === 200;
}

async function beforeAday(borrow: borrowI) {
	const existUser = await catalogSchema.findById(borrow.userId);
	const existBook = await catalogSchema.findById(borrow.bookId);
	const dto = new takeBookDto(borrow, existUser, existBook);
	const resp = await smsService.earnReturnBook(dto);
	return resp.status === 200;
}

async function lateBook(borrow: borrowI) {
	const existUser = await catalogSchema.findById(borrow.userId);
	const existBook = await bookSchema.findById(borrow.bookId);
	const dto = new takeBookDto(borrow, existUser, existBook);
	const resp = await smsService.lateReturnBook(dto);
	return resp.status === 200;
}
