import mongoose, { Schema , Document } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { default_secret } from '../constants';

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    avatar_url : string;
    isVerified : boolean;
    isAcceptingNotifications : boolean;
    lang_studying : Array<string>;
    refreshToken:string;
    generateAccessToken:Function;
    generateRefreshToken:Function;
    createdAt? : Date;
    updatedAt? : Date;
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
    avatar_url : {
        type : String,      // cloudinary url
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    lang_studying : {
        type : [String],
        default : []
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
    return jwt.sign(
        // Payload
        {
        _id: this._id,
        email: this.email
        },

        // Access Token secret
        process.env.ACCESS_TOKEN_SECRET || default_secret,
        
        // Expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        } 
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        // Payload
        {
        _id: this._id,
        },

        // Access Token secret
        process.env.REFRESH_TOKEN_SECRET || default_secret,
        
        // Expiry
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        } 
    )
}


const UserModel = mongoose.model<User>("User", UserSchema) ;
export default UserModel;