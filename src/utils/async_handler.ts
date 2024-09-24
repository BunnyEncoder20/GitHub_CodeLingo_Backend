import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError } from './ApiError';
import { StatusCodes } from '../constants';
import { z } from "zod";

// Typing for async_handler
export const async_handler = (async_func: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise
            .resolve(async_func(req, res, next))
            .catch((err: any) => {
                console.log("🙃 [async_handler]\n",err)
                // Check if the error is already an instance of ApiError
                if (!(err instanceof ApiError) && !(err instanceof z.ZodError)) {
                    // If not, wrap it in ApiError
                    err = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message || 'Unexpected error occurred', err.stack);
                }
                next(err);
            });
    };
};


// Same thing as above but using try-catch

// export const async_handler = (async_func) => async (req,res,next) => {
//     try{
//         await async_func(req,res,next)
//     }
//     catch(err) {
//         next(err)
//     }
// }