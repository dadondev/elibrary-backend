/** @format */

import * as mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		unique: true,
	},
	bookId: {
		type: mongoose.Schema.ObjectId,
		unique: true,
	},
	takeDate: {
		type: Date,
		default: Date.now(),
	},
	returnDate: {
		type: Date,
		default: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
	},
	sendSMS: {
		type: Date,
		default: new Date(),
	},
	status: {
		enum: ["earn", "late"],
		default: "earn",
		type: String,
	},
});

export default mongoose.model("borrow", borrowSchema);
