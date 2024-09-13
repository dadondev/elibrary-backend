/** @format */

import { Request, Response } from "express";
import authService from "../services/auth.service";

class authController {
	async getAll(_: Request, res: Response) {
		try {
			const resp = await authService.getAll();
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const resp = await authService.delete(id);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
	async register(req: Request, res: Response) {
		try {
			const data = req.body;
			if (!data.special) throw new Error("You can't add admin!");
			const resp = await authService.register(data);

			return res.status(201).json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
	async login(req: Request, res: Response) {
		try {
			const data = req.body;
			const resp = await authService.login(data);
			return res.status(200).json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
	async edit(req: Request, res: Response) {
		try {
			const body = req.body;
			const { id } = req.params;
			const resp = await authService.edit(id, body);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
	async forgetPassword(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const resp = await authService.forgetPassword(id);
			return res.json(resp);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
	async changePhoneNumber(req: Request, res: Response) {
		try {
			const { phoneNumber } = req.body;
			const { id } = req.params;
			const resp = await authService.changePhoneNumber(id, phoneNumber);
		} catch (error) {
			const err = error as Error;
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}

export default new authController();
