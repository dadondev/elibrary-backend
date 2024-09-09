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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({}));
app.use(morgan("dev"));
app.use("/api/catalogs", catalogRouter);
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

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
