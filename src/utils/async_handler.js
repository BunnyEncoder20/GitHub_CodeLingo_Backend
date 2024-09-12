
export const async_handler = (async_func) => (req, res, next) => {
    Promise
    .resolve(async_func(req,res,next))
    .catch((err) => next(err))
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