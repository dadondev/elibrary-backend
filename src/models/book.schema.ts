/** @format */

import * as mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 1,
	},
	author: {
		type: String,
		required: true,
		minLength: 1,
	},
	pagesCount: {
		type: Number,
		required: true,
	},
	status: {
		enum: ["missing", "free", "borrowed"],
		default: "free",
		type: String,
	},
	borrowId: {
		type: String,
		default: null,
	},
});

export default mongoose.model("book", bookSchema);
