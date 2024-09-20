import { async_handler } from "../utils/async_handler";
import { ApiResponse } from "../utils/ApiResponse";

import { z } from "zod"; 
import { zod_UserInputSchema, zod_UserInputType } from "../models/zod.models";

const register_user = async_handler(async (req, res) => {
    // TODO:  deconstruct data coming from the frontend (username, email, password, avatar_url, isVerified, lang_studying, isAcceptingNotifications, refreshToken)
    // const {usrename, email, password, avatar_url, isVerified, lang_studying, isAcceptingNotifications} = req.body

    // TODO:  validation of data (use ZOD)
    const validated_user_input = zod_UserInputSchema.safeParse(req.body)
    console.log(validated_user_input)



    // TODO:  check if user already exists
    // TODO:  check for images and upload them to cloudinary. (Check both files in server and then again at cloudinary)
    // TODO:  create new user - create a new user entry in db
    // TODO:  send the user data back (without the password and refreshToken field)
    // TODO:  send response


});

export { 
    register_user 
}