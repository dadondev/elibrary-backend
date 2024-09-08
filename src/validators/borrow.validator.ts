/** @format */

import * as yup from "yup";
const newBorrowValidator = yup.object({
	userId: yup.string().min(10).required(),
	bookId: yup.string().min(10).required(),
	returnDate: yup.date().optional(),
	takeDate: yup.date().optional(),
});

export default newBorrowValidator;
