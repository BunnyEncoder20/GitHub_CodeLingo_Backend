import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { Application } from "express";
import connectDB from "./db/index.js";

import { DB_name } from "./constants.js";

const app: Application = express();
dotenv.config({
	path: "./.env",
});


// Connecting to the db
connectDB()

