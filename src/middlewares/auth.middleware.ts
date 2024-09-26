import { async_handler } from "../utils/async_handler";
import { StatusCodes } from "../constants";
import { ApiError } from "../utils/ApiError";
import { default_jwt_secret } from "../constants";

import UserModel from "../models/users.model";
import jwt, { JwtPayload } from "jsonwebtoken";



export const verify_user = async_handler(async (req,_,next) => {
    const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ","")
    if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "🛑 [auth] access token not found")
    }

    // TODO: verify token
    const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || default_jwt_secret) as JwtPayload

    // TODO: get the user data from the database
    const user_data = await UserModel.findById(decoded_token?._id).select("-password -refreshToken");
    if (!user_data) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "🛑 [auth] invalid access token")
    }

    // TODO: attach user data to the request object
    req.user = user_data
    next()
});