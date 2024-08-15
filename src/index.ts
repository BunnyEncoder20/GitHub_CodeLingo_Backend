import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { Application } from "express";
import { DB_name } from "./constants.js";

const app: Application = express();
dotenv.config({
	path: "./.env",
});

(async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
		console.log("Connected to MongoDB");

		// App listening to requests
		app.listen(process.env.PORT, () => {
			console.log("Server is listening on port : ", process.env.PORT);
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
})();
