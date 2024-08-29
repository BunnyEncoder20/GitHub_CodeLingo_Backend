import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// Middlewares
app.use(
	cors({
		origin: process.env.CORS_ORIGIN_LIST,
		credentials: true,
	})
);

app.use(
	express.json({
		limit: "16kb",
	})
);

app.use(
	express.urlencoded({
		extended: true,
		limit: "16kb",
	})
);

// Importing Rotues

// Routes forwarding

// for all unmatched routes

// Global Error handling middleware

export default app;
