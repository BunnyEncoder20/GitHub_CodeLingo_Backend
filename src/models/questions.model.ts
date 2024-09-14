import mongoose, { Schema , Document } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { default_secret } from '../constants';

export interface User extends Document {
    
}

const UserModel = mongoose.model<User>("User", UserSchema) ;
export default UserModel;