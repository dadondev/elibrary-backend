/** @format */

import bookDto from "../dtos/book.dto";
import bookSchema from "../models/book.schema";
import bookValidator from "../validators/book.validator";

class bookService {
	async create(data: any) {
		const validatedData = bookValidator.validateSync(data);
		const newBook = await bookSchema.create(validatedData);
		return new bookDto(newBook);
	}
	async edit(id: string, data: any) {
		const validatedData = bookValidator.validateSync(data);
		const existBook = await bookSchema.findByIdAndUpdate(id, validatedData, {
			new: true,
		});
		return new bookDto(existBook);
	}
	async getAll() {
		const allDatas = await bookSchema.find();
		return allDatas.map((e) => new bookDto(e));
	}
	async getOne(id: string) {
		const book = await bookSchema.findById(id);
		return new bookDto(book);
	}
	async delete(id: string) {
		const book = await bookSchema.findByIdAndDelete(id);
		return new bookDto(book);
	}
	async changeStatus(
		id: string,
		status: "missing" | "free" | "borrowed",
		borrowId: undefined | string
	) {
		const book = await bookSchema.findById(id);
		if (!book) throw new Error("Book is not found");
		if (status === "free") {
			book.status = status;
			book.borrowId = "";
		} else if (status === "missing") {
			book.borrowId = "";
		} else if (borrowId) {
			book.borrowId = borrowId;
		}
		await book.save();
		return new bookDto(book);
	}
	async changeBorrowId(id: string, borrowId: string) {
		if (!borrowId || !id) throw new Error("borrowId must be");
		const book = await bookSchema.findByIdAndUpdate(id, { borrowId });
		return new bookDto(book);
	}
}

export default new bookService();
