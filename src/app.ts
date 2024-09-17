import express, { Application,Request,Response,NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { StatusCodes } from "./constants";

const app:Application = express();

// Middlewares
app.use(
	cors({
		origin: process.env.CORS_ORIGIN_LIST,
		credentials: true,
	})
);

app.use(
	cookieParser()
)

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

app.use(
	express.static("public")
)

// Importing Rotues
import user_router from "./routes/user.routes";

// Routes forwarding
app.use("/api/v1/users", user_router);

// for all unmatched routes






// Global Error handling middleware
app.use(
	(err:any, req:Request, res:Response, next:NextFunction) => {
		console.error(err.stack);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("[Global Error Handler] 😞 Internal server Error!");
	}
)

export default app;
