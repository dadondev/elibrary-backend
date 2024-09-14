/** @format */

import express from "express";
import mongoose from "mongoose";
import { DB_URL, PORT } from "./utils/utils";
import helmet from "helmet";
import morgan from "morgan";
import catalogRouter from "./routes/catalog.routes";
import bookRouter from "./routes/book.routes";
import borrowRouter from "./routes/borrow.routes";
import cron from "node-cron";
import cronService from "./services/cron.service";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

const corsOptions = {
	origin: ["http://localhost:3000", "https://quiz-app-clone.vercel.app/", "*"],
	methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
	credentials: true,
	optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({}));
app.use(morgan("dev"));
app.use("/api/catalogs", authMiddleware, catalogRouter);
app.use("/api/books", authMiddleware, bookRouter);
app.use("/api/borrow", authMiddleware, borrowRouter);
app.use("/api/auth", authRouter);

async function bootstrap() {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log("Server is working port:", PORT));
	} catch (error) {
		console.log(error);
	}
}

bootstrap();

cron.schedule("*/5 * * * 1-6", async () => {
	await cronService.examineBorrows();
	console.log("I send sms all users!");
});
