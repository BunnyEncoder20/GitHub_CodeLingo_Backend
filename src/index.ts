import dotenv from "dotenv";
import express, { Application } from "express";
import connectDB from "./db/connect"


const app: Application = express();
dotenv.config({
	path: "./.env",
});


// Connecting to the db
connectDB()

