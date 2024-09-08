/** @format */

import * as yup from "yup";

const bookValidator = yup.object({
	name: yup.string().required().min(3),
	author: yup.string().required().min(3),
	pagesCount: yup.number().required().min(2),
});

export const editBookValidator = yup.object({
	name: yup.string().required().min(3).optional(),
	author: yup.string().required().min(3).optional(),
	pagesCount: yup.number().required().min(2).optional(),
});

export default bookValidator;
