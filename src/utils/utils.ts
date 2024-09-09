/** @format */

import { config } from "dotenv";

config();

export const PORT = process.env.PORT || "8000";
export const DB_URL = process.env.DB_URL || "";
export const PHONE_NUMBER = process.env.TEL_PHONE || "";
export const TEXTFLOW_TOKEN = process.env.TEXTFLOW_TOKEN || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
