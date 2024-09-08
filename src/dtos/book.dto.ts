/** @format */

class bookDto {
	id: string;
	name: string;
	author: string;
	pagesCount: number;
	status: "missing" | "free" | "borrowed";
	borrowId?: string;

	constructor(data: any) {
		this.id = data._id;
		this.name = data.name;
		this.author = data.author;
		this.pagesCount = data.pagesCount;
		this.status = data.status;
		this.borrowId = data.borrowId;
	}
}
export default bookDto;
