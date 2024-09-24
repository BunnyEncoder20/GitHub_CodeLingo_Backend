import express, { Application,Request,Response,NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { StatusCodes } from "./constants";
import { ApiError } from "./utils/ApiError";
import { ApiResponse } from "./utils/ApiResponse";
import { z } from "zod";

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





// Global Error Handler
app.use(
	(err: any, req: Request, res: Response, next: NextFunction) => {
		console.error(err);

		// If it's an ApiError, return the proper status code and message
		if (err instanceof ApiError) {
			console.log("[Global Error Handler] It is a ApiError class instance");
			return res.status(err.statusCode).json(err);
		}

		if (err instanceof z.ZodError) {
			const zodError = new ApiError(
				StatusCodes.BAD_REQUEST, 
				"🟥 [Global Error Handler] Zod Error",
				err.stack,
				err.errors
			);
			return res.status(StatusCodes.BAD_REQUEST).json(zodError);
		}

		// Otherwise, return a generic internal server error
		const apiResponse = new ApiResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, "[Global Error Handler] 😞 Internal server error",err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(apiResponse);
	}
);

export default app;
