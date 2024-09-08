/** @format */

import { Request, Response } from "express";
import catalogService from "../services/catalog.service";
import { editCatalogValidator } from "../validators/catalog.validator";
import smsService from "../services/sms.service";

class catalogController {
	async getAll(_: Request, res: Response) {
		try {
			const datas = await catalogService.getAll();
			return res.json(datas);
		} catch (error) {
			const err = error as Error;
			res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async getOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Id not found");
			const data = await catalogService.getOne(id);
			return res.json(data);
		} catch (error) {
			const err = error as Error;
			res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async create(req: Request, res: Response) {
		try {
			const data = req.body;
			const resp = await catalogService.create(data);
			await smsService.welcomeSMS(
				resp.phoneNumber || resp.parents[0].phoneNumber,
				`${resp.lastName} ${resp.firstName}`
			);
			return res.json(resp);
		} catch (error) {
			console.log(error);

			const err = error as Error;
			res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async edit(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Id not found");
			const data = editCatalogValidator.validateSync(req.body);
			const resp = await catalogService.edit(id, data);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async addParent(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Id not found");
			const data = req.body;
			const resp = await catalogService.addParent(id, data);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Id not found");
			const resp = await catalogService.delete(id);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			res.status(400).json({
				message: err.message,
				statusCode: 400,
			});
		}
	}
}
export default new catalogController();
