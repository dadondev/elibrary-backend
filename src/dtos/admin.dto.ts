/** @format */

export class jwtDto {
	id: string;
	firstName: string;
	lastName: string;
	role: "primary" | "secondary";
	password: string;
	phoneNumber: string;
	constructor(data: any) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.role = data.role;
		this.password = data.password;
		this.phoneNumber = data.phoneNumber;
		this.id = data._id;
	}
}

export class respDto {
	id: string;
	firstName: string;
	lastName: string;
	role: "primary" | "secondary";
	phoneNumber: string;
	constructor(data: any) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.role = data.role;
		this.phoneNumber = data.phoneNumber;
		this.id = data._id;
	}
}
