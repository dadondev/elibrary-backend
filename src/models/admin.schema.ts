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
	},
	role: {
		enum: ["primary", "secondary", "third"],
		default: "third",
		type: String,
	},
});

export default mongoose.model("admin", adminSchema);
