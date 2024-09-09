/** @format */

import * as mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		enum: ["primary", "secondary"],
		default: "secondary",
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
		default: null,
	},
	refreshToken: {
		type: String,
		default: null,
	},
});

export default mongoose.model("admin", adminSchema);
