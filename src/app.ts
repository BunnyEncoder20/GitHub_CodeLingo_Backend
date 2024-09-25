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
        console.error("❗[Global Error Handler]\n",err);

        // If it's already an ApiError, return it as is
        if (err instanceof ApiError) {
            console.log("[Global Error Handler] It is an ApiError instance");
            return res.status(err.statusCode).json({err});
        }

        // If the error contains the necessary properties, convert it into an ApiError
        if (err.statusCode && err.message) {
            const apiError = new ApiError(
                err.statusCode, 
                err.message,
                err.stack,
                err.data // Optional, if the original error contains data
            );
            return res.status(apiError.statusCode).json({
                success: apiError.success,
                statusCode: apiError.statusCode,
                message: apiError.message,
                stack: process.env.NODE_ENV === 'development' ? apiError.stack : undefined,
                data: apiError.data,
            });
        }

		// If it's a ZodError, wrap it into an ApiError
		if (err instanceof z.ZodError) {
			console.log("[err.stack]\n",err.stack)
			console.log("[err.errors]\n",err.errors)
			const zodError = new ApiError(
				StatusCodes.BAD_REQUEST, 
				"🟥 [Global Error Handler] Zod Error",
				err.stack,
				err.errors
			);
			return res.status(StatusCodes.BAD_REQUEST).json(zodError);
		}

        // If it's not an ApiError and doesn't have the expected properties, wrap it in a generic ApiError
        const genericError = new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            '😞 Internal server error',
            err.stack
        );
        return res.status(genericError.statusCode).json({
            success: genericError.success,
            statusCode: genericError.statusCode,
            message: genericError.message,
            stack: process.env.NODE_ENV === 'development' ? genericError.stack : undefined,
        });
    }
);

export default app;
