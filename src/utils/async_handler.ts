import { Request, Response, NextFunction, RequestHandler } from 'express';

// Typing for async_handler
export const async_handler = (async_func: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise
            .resolve(async_func(req, res, next))
            .catch((err: any) => next(err));
    };
}


// Same thing as above but using try-catch

// export const async_handler = (async_func) => async (req,res,next) => {
//     try{
//         await async_func(req,res,next)
//     }
//     catch(err) {
//         next(err)
//     }
// }