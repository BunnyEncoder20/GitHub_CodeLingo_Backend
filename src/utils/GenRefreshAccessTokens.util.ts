import { async_handler } from "../utils/async_handler";
import { User } from "../models/users.model";


// FIXME: What is this type error happenign here
// Directly send the user model instance here 
export const GenerateRefreshAccessTokens = async_handler(async (userInstance:User) => {
    const access_token = await userInstance.generateAccessToken();
    const refresh_token = await userInstance.generateRefreshToken();
    userInstance.refreshToken = refresh_token;
    await userInstance.save({ validateBeforeSave : false });
    return { access_token, refresh_token };
});