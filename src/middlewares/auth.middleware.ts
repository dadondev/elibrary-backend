/** @format */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/utils";
import adminSchema from "../models/admin.schema";
import { updateTokens } from "../functions/updateTokens";

export async function authMiddleware(
	req: Request,
	res: Response,
	next: () => void
) {
	const token = req.headers["Authorization"]

	if(!token) return res.status(401).json({message:"Authorization failed."});
	const userData:any = jwt.decode(token as string)
	if(!userData) return res.status(401).json({message:"Invalid token"});
	const existUser = await adminSchema.findById(userData.id)
	try{
		jwt.verify(token as string, JWT_SECRET)
		return next()
	}catch (e) {
		try{
			await updateTokens(existUser);
			return next()
		}catch (_) {
			return res.status(401).json({message:"Authorization failed."});
		}

	}
}
