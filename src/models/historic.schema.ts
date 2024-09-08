/** @format */

import mongoose from "mongoose";

const historicSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	bookId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	takeDate: {
		type: Date,
		required: true,
	},
	returnDate: {
		type: Date,
		required: true,
	},
});

export default mongoose.model("historic", historicSchema);
