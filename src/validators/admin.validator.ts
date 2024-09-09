/** @format */

import * as yup from "yup";
const adminValidator = yup.object({
	firstName: yup.string().min(3).required(),
	lastName: yup.string().min(3).required(),
	phoneNumber: yup.string().min(13).max(13).required(),
	password: yup.string().min(6).max(10).required(),
});
export default adminValidator;

export const loginValidator = yup.object({
	phoneNumber: yup.string().min(13).max(13).required(),
	password: yup.string().min(6).max(10).required(),
});
