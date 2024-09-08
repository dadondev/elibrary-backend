/** @format */

import { Request, Response } from "express";
import borrowService from "../services/borrow.service";

class borrowController {
	async getAll(_: Request, res: Response) {
		try {
			const resp = await borrowService.getAll();
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async getOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			return res.json(await borrowService.getOne(id as any));
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async create(req: Request, res: Response) {
		try {
			const days = req.query.days || "10";
			const data = req.body;
			const resp = await borrowService.create(data, days as string);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async changeTakeDate(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const date = req.body;
			if (!date || !id) throw new Error("Data is not full");
			const resp = await borrowService.changeTakeDate(id, date);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async changeReturnDate(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const date = req.body;
			if (!date || !id) throw new Error("Data is not full");
			const resp = await borrowService.changeReturnDate(id, date);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async changeUserId(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const userId = req.body;
			if (!userId || !id) throw new Error("Data is not full");
			const resp = await borrowService.changeUserId(id, userId);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async changeBookId(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { bookId } = req.body;
			if (!bookId || !id) throw new Error("Data is not full");
			const resp = await borrowService.changeBookId(id, bookId);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async changeSMSDate(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const date = req.body;
			if (!date || !id) throw new Error("Data is not full");
			const resp = await borrowService.changeSMSDate(id, date);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async removeBorrow(req: Request, res: Response) {
		try {
			const { id } = req.params;
			return res.json(await borrowService.removeBorrow(id as any));
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
}

export default new borrowController();
