/** @format */

import mongoose from "mongoose";

class borrowDto {
	id: mongoose.Schema.Types.ObjectId;
	userId: mongoose.Schema.Types.ObjectId;
	bookId: mongoose.Schema.Types.ObjectId;
	takeDate: Date;
	returnDate: Date;
	sendSMS: Date;
	status: "earn" | "late";
	constructor(data: any) {
		this.id = data.id;
		this.userId = data.userId;
		this.bookId = data.bookId;
		this.takeDate = data.takeDate;
		this.returnDate = data.returnDate;
		this.status = data.status;
		this.sendSMS = data.sendSMS;
	}
}
export default borrowDto;
