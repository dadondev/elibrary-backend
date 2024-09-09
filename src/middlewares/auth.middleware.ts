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
	const { accessToken, refreshToken } = req.cookies;
	if (!accessToken)
		return res.status(400).json({ message: "Authorization failed" });
	if (!refreshToken)
		return res.status(400).json({ message: "Authorization failed" });
	const user = jwt.decode(accessToken);
	if (!user || typeof user === "string")
		return res.status(400).json({ message: "Authorization failed" });
	const existUser = await adminSchema.findById(user.id);
	if (!existUser)
		return res.status(400).json({ message: "Authorization failed" });

	const expiredAT = jwt.verify(accessToken, JWT_SECRET);
	const expiredRT = jwt.verify(accessToken, JWT_SECRET);

	if (typeof expiredAT === "string" || typeof expiredRT === "string")
		await updateTokens(existUser);
	next();
}
