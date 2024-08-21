import dotenv from "dotenv";
import express, { Application } from "express";
import connectDB from "@/db"


const app: Application = express();
dotenv.config({
	path: "./.env",
});


// Connecting to the db
console.log("Hello there !")
connectDB()

