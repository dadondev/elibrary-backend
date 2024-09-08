"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXTFLOW_TOKEN = exports.PHONE_NUMBER = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || "8000";
exports.DB_URL = process.env.DB_URL || "";
exports.PHONE_NUMBER = process.env.TEL_PHONE || "";
exports.TEXTFLOW_TOKEN = process.env.TEXTFLOW_TOKEN || "";
