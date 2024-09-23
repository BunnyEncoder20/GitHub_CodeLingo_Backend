import { async_handler } from "../utils/async_handler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { upload2Cloudinary } from "../utils/cloudinary.service";
import { StatusCodes } from "../constants";
import { zod_UserInputSchema, zod_UserInputType } from "../models/zod.models";

import UserModel from "../models/users.model";

const register_user = async_handler(async (req, res) => {
    // TODO:  deconstruct data coming from the frontend (username, email, password, avatar_url, isVerified, lang_studying, isAcceptingNotifications, refreshToken)
    const {username, email, password, isVerified, lang_studying, isAcceptingNotifications} = req.body

    // TODO:  validation of data (use ZOD)
    const validated_user_input = zod_UserInputSchema.safeParse(req.body)
    console.log("❗ [controller] \n",validated_user_input)

    // TODO:  check if user already exists
    const exists_user = await UserModel.findOne({
        $or : [{ username },{ email }]
    })
    if (exists_user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "🔴 [controller] user already exists")
    }

    // TODO:  check for images and upload them to cloudinary. (Check both files in server and then again at cloudinary)
    const avatar_local_path = req.file?.path
    console.log(req.file)
    if (!avatar_local_path) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "[controller] avatar image local path not found. Check if the file was uploaded to the server")
    }

    const upload_result = await upload2Cloudinary(avatar_local_path)
    console.log("🟢 [controller]\n",upload_result)

    // TODO:  create new user - create a new user entry in db
    let new_user : zod_UserInputType = {
        username: username.toLowerCase(),
        email: email,
        password: password,
        // TODO: add a default profile image path here (maybe add that in the constants file)
        avatar_url: upload_result?.url || "/default/profile/pic/image/path/here",
        isVerified: isVerified,
        lang_studying: lang_studying,
        isAcceptingNotifications: isAcceptingNotifications
    };

    const created_user = await UserModel.create(new_user);
    if (! await UserModel.findById(created_user._id) ){
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "[controller] user not created")
    }
    console.log(created_user)


    // TODO:  send the user data back (without the password and refreshToken field)
    // TODO:  send response 

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(true, StatusCodes.CREATED, "user created successfully", created_user)
    )

});

export { 
    register_user 
}