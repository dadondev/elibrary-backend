/** @format */

export class takeBookDto {
	phoneNumber: string;
	bookName: string;
	fullName: string;
	takeDate: Date;
	returnDate: Date;
	constructor(data: any, user: any, book: any) {
		console.log(user);
		this.phoneNumber = user.phoneNumber;
		this.bookName = book.name;
		this.fullName = `${user.lastName} ${user.firstName}`;
		this.takeDate = data.takeDate;
		this.returnDate = data.returnDate;
	}
}
