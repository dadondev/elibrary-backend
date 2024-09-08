/** @format */

import { Request, Response } from "express";
import bookService from "../services/book.service";

class bookController {
	async create(req: Request, res: Response) {
		try {
			const data = req.body;
			const resp = await bookService.create(data);
			return res.json(resp);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
	async edit(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = req.body;
			const resp = await bookService.edit(id, data);
			return res.json(resp);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = await bookService.delete(id);
			return res.status(200).json(data);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
	async getAll(_: Request, res: Response) {
		try {
			const datas = await bookService.getAll();
			return res.status(200).json(datas);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
	async getOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const resp = await bookService.getOne(id);
			return res.json(resp);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
	async changeStatus(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { status, borrowId } = req.query;
			const resp = await bookService.changeStatus(
				id,
				status as "missing" | "free" | "borrowed",
				borrowId as string | undefined
			);
			return res.json(resp);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
	async changeBorrowId(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { borrowId } = req.query;
			const resp = await bookService.changeBorrowId(id, borrowId as string);
			return res.status(200).json(resp);
		} catch (error) {
			const { message } = error as Error;
			res.status(400).json({
				message,
				statusCode: 400,
			});
		}
	}
}

export default new bookController();
