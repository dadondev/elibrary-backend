/** @format */

import * as yup from "yup";

const catalogValidator = yup.object({
	firstName: yup.string().min(4).required(),
	lastName: yup.string().min(4).required(),
	phoneNumber: yup.string().min(13).max(13).required(),
	address: yup.string().min(10).max(160).required(),
	parents: yup.array().min(1).required(),
	birthday: yup.date().required(),
});

export default catalogValidator;

export const editCatalogValidator = yup.object({
	firstName: yup.string().min(4).required().optional(),
	lastName: yup.string().min(4).required().optional(),
	phoneNumber: yup.string().min(13).max(13).required().optional(),
	address: yup.string().min(10).max(160).required().optional(),
	parents: yup.array().min(1).required().optional(),
	birthday: yup.date().required().optional(),
});

export const parentValidator = yup.object({
	firstName: yup.string().min(4).required(),
	lastName: yup.string().min(4).required(),
	phoneNumber: yup.string().min(13).required(),
	role: yup.string().required().min(3),
	job: yup.string().required().min(4),
});
