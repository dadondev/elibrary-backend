/** @format */

import adminSchema from "../models/admin.schema";
import adminValidator, { loginValidator } from "../validators/admin.validator";
import { jwtDto, respDto } from "../dtos/admin.dto";
import jsonWebToken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/utils";
import bcyrpt from "bcryptjs";
import { updateTokens } from "../functions/updateTokens";
import sendSMS from "./textflow.service";

class authService {
	async register(data: any) {
		let validatedData = adminValidator.validateSync(data);
		validatedData.password = bcyrpt.hashSync(validatedData.password, 10);
		const newAdmin = await adminSchema.create(validatedData);
		const accessToken = jsonWebToken.sign(
			{ ...new jwtDto(newAdmin) },
			JWT_SECRET,
			{
				expiresIn: "12h",
			}
		);
		const refreshToken = jsonWebToken.sign(
			{ ...new jwtDto(newAdmin) },
			JWT_SECRET,
			{
				expiresIn: "30d",
			}
		);
		newAdmin.accessToken = accessToken;
		newAdmin.refreshToken = refreshToken;
		await newAdmin.save();
		return {
			user: new respDto(newAdmin),
			tokens: {
				accessToken,
				refreshToken,
			},
		};
	}
	async login(data: any) {
		const { phoneNumber, password } = loginValidator.validateSync(data);
		const existAdmin = await adminSchema.findOne({ phoneNumber });
		if (!existAdmin) throw new Error("The admin is not found!");
		const passwordTheSame = bcyrpt.compareSync(password, existAdmin.password);
		if (!passwordTheSame) throw new Error("The user's password is not equal!");
		const tokens = await updateTokens(existAdmin);
		return {
			tokens,
			user: new respDto(existAdmin),
		};
	}
	async changePhoneNumber(adminId: string, data: string) {
		const existAdmin = await adminSchema.findById(adminId);
		if (!existAdmin) throw new Error("Admin not found");
		if (data.length !== 13) throw new Error("Phone number is not phone number");
		existAdmin.phoneNumber = data;
		await existAdmin.save();
		return new respDto(existAdmin);
	}
	async edit(adminId: string, data: any) {
		const existAdmin = await adminSchema.findByIdAndUpdate(adminId, data, {
			new: true,
		});
		return new respDto(existAdmin);
	}
	async forgetPassword(adminId: string) {
		const existAdmin = await adminSchema.findById(adminId);
		if (!existAdmin) throw new Error("The admin is not found");
		const randomPassword = Math.ceil(Math.random() * 100000) + "";
		existAdmin.password = bcyrpt.hashSync(randomPassword, 10);
		await sendSMS(
			existAdmin.phoneNumber,
			`Sizning yangi parolingiz ${randomPassword}`
		);
		return "Your new password send your phone number!";
	}
	async delete(adminId: string) {
		const existAdmin = await adminSchema.findByIdAndDelete(adminId);
		return new respDto(existAdmin);
	}
	async getAll() {
		const admins = await adminSchema.find();
		return admins.map((admin) => new respDto(admin));
	}
}

export default new authService();
