/** @format */
import jwt from "jsonwebtoken";
import { jwtDto } from "../dtos/admin.dto";
import { JWT_SECRET } from "../utils/utils";

export async function updateTokens(admin: any) {
	const { refreshToken, accessToken } = admin;
	if (!refreshToken) {
		admin.refreshToken = jwt.sign({ ...new jwtDto(admin) }, JWT_SECRET, {
			expiresIn: "30d",
		});
		await admin.save();
	}
	if (!accessToken) {
		admin.accessToken = jwt.sign({ ...new jwtDto(admin) }, JWT_SECRET, {
			expiresIn: "12h",
		});
		await admin.save();
	}
	try {
		const expiredAT = jwt.verify(accessToken, JWT_SECRET);
	const expiredRT = jwt.verify(refreshToken, JWT_SECRET);
	} catch(error){
		admin.accessToken = jwt.sign({ ...new jwtDto(admin) }, JWT_SECRET, {
				expiresIn: "12h",
		});
		admin.refreshToken = jwt.sign({ ...new jwtDto(admin) }, JWT_SECRET, {
				expiresIn: "30d",
		});
	}
	

	await admin.save();
	return {
		accessToken: admin.accessToken,
		refreshToken: admin.refreshToken,
	};
}
