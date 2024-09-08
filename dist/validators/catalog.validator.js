"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentValidator = exports.editCatalogValidator = void 0;
const yup = __importStar(require("yup"));
const catalogValidator = yup.object({
    firstName: yup.string().min(4).required(),
    lastName: yup.string().min(4).required(),
    phoneNumber: yup.string().min(13).max(13).required(),
    address: yup.string().min(10).max(160).required(),
    parents: yup.array().min(1).required(),
    birthday: yup.date().required(),
});
exports.default = catalogValidator;
exports.editCatalogValidator = yup.object({
    firstName: yup.string().min(4).required().optional(),
    lastName: yup.string().min(4).required().optional(),
    phoneNumber: yup.string().min(13).max(13).required().optional(),
    address: yup.string().min(10).max(160).required().optional(),
    parents: yup.array().min(1).required().optional(),
    birthday: yup.date().required().optional(),
});
exports.parentValidator = yup.object({
    firstName: yup.string().min(4).required(),
    lastName: yup.string().min(4).required(),
    phoneNumber: yup.string().min(13).required(),
    role: yup.string().required().min(3),
    job: yup.string().required().min(4),
});
