import mongoose, { Schema , Document } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    verificationCode : string;
    verificationCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingNotifications : boolean;
    refreshToken:string;
    generateAccessToken:Function;
    generateRefreshToken:Function;
}

const UserSchema : Schema<User> = new Schema({
    username : {
        type : String,
        required : [true, "username is required"],
        trim : true,
        unique : true
    },
    email : {
        type : String,
        required : [true, "email is required"],
        trim : true,
        unique : true,
        match : [
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            "please provide a valid email"
        ]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    isAcceptingNotifications : {
        type : Boolean,
        default : true
    },
    refreshToken:{
        type : String,
    }
},
{
    timestamps : true
});


// Methods of UserSchema (For authetication)
UserSchema.methods.generateAccessToken()


const UserModel = mongoose.model<User>("User", UserSchema) ;
export default UserModel;