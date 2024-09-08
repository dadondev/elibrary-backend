/** @format */

import mongoose from "mongoose";
import borrowDto from "../dtos/borrow.dto";
import borrowSchema from "../models/borrow.schema";
import newBorrowValidator from "../validators/borrow.validator";
import dateFNS from "date-fns";
import bookSchema from "../models/book.schema";
import catalogSchema from "../models/catalog.schema";
import { isDate } from "util/types";
import historicSchema from "../models/historic.schema";
import smsService from "./sms.service";

class borrowService {
	async getAll() {
		const datas = await borrowSchema.find();
		return datas.map((e) => new borrowDto(e));
	}
	async getOne(id: mongoose.Schema.Types.ObjectId) {
		const data = await borrowSchema.findById(id);
		return new borrowDto(data);
	}
	async create(data: any, days: string) {
		let validatedData = newBorrowValidator.validateSync(data);
		validatedData.takeDate = new Date();
		validatedData.returnDate = new Date(
			dateFNS.addDays(new Date(), +days).getTime()
		);
		const book = await bookSchema.findById(validatedData.bookId);
		const catalog = await catalogSchema.findById(validatedData.userId);
		if (!catalog) throw new Error("The catalog is not found");
		if (!book) throw new Error("The book is not found");
		if (book.status === "borrowed")
			throw new Error("The book already borrowed");
		if (book.status === "missing") throw new Error("The book is missing");
		book.status = "borrowed";
		await book.save();
		const newBorrow = await borrowSchema.create(validatedData);
		return new borrowDto(newBorrow);
	}
	async changeTakeDate(id: string, date: Date) {
		const existBorrow = await borrowSchema.findByIdAndUpdate(id, {
			takeDate: date,
		});
		if (!existBorrow) throw new Error("The borrow is not found");
		return new borrowDto(existBorrow);
	}
	async changeReturnDate(id: string, date: Date) {
		const existBorrow = await borrowSchema.findByIdAndUpdate(id, {
			returnDate: date,
		});
		if (!existBorrow) throw new Error("The borrow is not found");
		return new borrowDto(existBorrow);
	}
	async changeUserId(borrowId: string, userId: string) {
		const existCatalog = await catalogSchema.findById(userId);
		if (!existCatalog) throw new Error("Catalog not found");
		const existBorrow = await borrowSchema.findByIdAndUpdate(borrowId, {
			userId,
		});
		return new borrowDto(existBorrow);
	}
	async changeBookId(borrowId: string, bookId: any) {
		const existBorrow = await borrowSchema.findById(borrowId);
		if (!existBorrow) throw new Error("The borrow is not found");
		try {
			const existPrevBook = await bookSchema.findById(existBorrow.bookId);
			existPrevBook!.status = "free";
			await existPrevBook!.save();
		} catch (error) {
			console.log(error);
		}
		existBorrow.bookId = bookId;
		await existBorrow.save();
		return new borrowDto(existBorrow);
	}
	async changeSMSDate(id: string, date: Date) {
		const existBorrow = await borrowSchema.findById(id);
		if (!existBorrow) throw new Error("The borror is not found");
		if (!isDate(date)) throw new Error("Your date is not equal to Date type");
		existBorrow.sendSMS = date;
		await existBorrow.save();
		return new borrowDto(existBorrow);
	}
	async removeBorrow(id: string) {
		const existBorrow = await borrowSchema.findByIdAndDelete(id);
		if (!existBorrow) throw new Error("The borror is not found");
		try {
			await bookSchema.findByIdAndUpdate(existBorrow.bookId, {
				status: "free",
			});
			await historicSchema.create(existBorrow);
		} catch (error) {
			console.log(error);
		}
		return new borrowDto(existBorrow);
	}
}
export default new borrowService();
