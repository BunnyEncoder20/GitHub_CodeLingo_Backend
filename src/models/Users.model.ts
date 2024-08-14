import mongoose, { Schema , Document } from 'mongoose';

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    verificationCode : string;
    verificationCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingNotifications : boolean;
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
    verificationCode : {
        type : String,
        required : [true, "verification code is required"]
    },
    verificationCodeExpiry : {
        type : Date ,
        required : [true, "verificaiton code expiry date is required"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAcceptingNotifications : {
        type : Boolean,
        default : true
    }
},
{
    timestamps : true
});

const UserModel = mongoose.model<User>("User", UserSchema) ;
export default UserModel;