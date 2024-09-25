import { async_handler } from "../utils/async_handler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { upload2Cloudinary } from "../utils/cloudinary.service";
import { StatusCodes,default_avatar_url } from "../constants";
import { zod_RawUserData, zod_RawUserType, zod_UserInputType } from "../models/zod.models";

import UserModel from "../models/users.model";

const register_user = async_handler(async (req, res) => {

    // DONE: deconstruct data from req.body
    const {username, email, password, isVerified, lang_studying, isAcceptingNotifications,raw,bool} = req.body


    // DONE:  validation of raw input data (use ZOD)
    const raw_user_data : zod_RawUserType = {
        username : username.toLowerCase(),
        email : email,
        password : password,
        isVerified : Boolean(isVerified),
        lang_studying : lang_studying.split(",").map((lang:string) => lang.trim()),
        isAcceptingNotifications : Boolean(isAcceptingNotifications)
    }
    zod_RawUserData.parse(raw_user_data)
     

    // DONE:  check if user already exists
    const exists_user = await UserModel.findOne({
        $or : [{ username },{ email }]
    })
    if (exists_user) {
        // TODO: Standardize these errors (Try to throw error here and make ApiError class instance at global error handlers itself)
        throw new ApiError(StatusCodes.BAD_REQUEST, "🔴 [controller] user already exists")
    }

    // DONE:  check for images and upload them to cloudinary. (Check both files in server and then again at cloudinary)
    const avatar_local_path = req.file?.path
    console.log("",req.file)
    if (!avatar_local_path) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "[controller] avatar image local path not found. Check if the file was uploaded to the server")
    }

    const upload_result = await upload2Cloudinary(avatar_local_path)
    if (!upload_result) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "🟥 [controller] cloudinary upload failed")
    }

    // TODO:  create new user (new user => generate refresh token => save to user)
    let new_user : zod_UserInputType = {
        username: username.toLowerCase(),
        email: email,
        password: password,
        avatar_url: upload_result?.url || default_avatar_url,
        isVerified: isVerified,
        lang_studying: lang_studying,
        isAcceptingNotifications: isAcceptingNotifications
    };

    const created_user = await UserModel.create(new_user);
    created_user.refreshToken = created_user.generateRefreshToken();
    await created_user.save();

    if ( !created_user ){
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "🟥 [controller] user not created")
    }
    console.log("💚 [controller]\n",created_user)


    // TODO:  send the user data back (without the password and refreshToken field)
    // TODO:  send response 
    const filtered_userdata = {
        username: created_user.username,
        email: created_user.email,
        avatar_url: created_user.avatar_url,
        isVerified: created_user.isVerified,
        lang_studying: created_user.lang_studying,
        isAcceptingNotifications: created_user.isAcceptingNotifications
    }
    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(true, StatusCodes.CREATED, "user created successfully", filtered_userdata)
    )

});

export { 
    register_user 
}