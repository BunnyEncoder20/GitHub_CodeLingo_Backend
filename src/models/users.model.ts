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


// MongoDB hooks
// UserSchema.pre("save", () => {}) Do not use this kind cause arrow functions do not have proper THIS context hence can cause errors as "pre" requires the UserSchema
UserSchema.pre("save", async function (next): Promise<void> {
    if (!this.isModified("password")){
        return next();
    }

    // Else if password has changed, encrypt it 
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// Custom Methods of UserSchema (even in these we would always use normal functions as these too use the THIS context)
UserSchema.methods.isPasswordCorrect = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function () {
    jwt.sign(
        // Payload
        {
        _id: this._id,
        email: this.email
        },

        // Access Token secret
        process.env.ACCESS_TOKEN_SECRET,
        
        // Expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        } 
    )
}

UserSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        // Payload
        {
        _id: this._id,
        },

        // Access Token secret
        process.env.REFRESH_TOKEN_SECRET,
        
        // Expiry
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        } 
    )
}


const UserModel = mongoose.model<User>("User", UserSchema) ;
export default UserModel;