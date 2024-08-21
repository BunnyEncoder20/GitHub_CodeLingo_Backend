import mongoose from "mongoose";
import { DB_name } from "../constants";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        console.log(`[db] MongoDB connection successful !!! \n[db] DB Host : ${connectionInstance.connection.host}`);
        // console.log(connectionInstance);
        
    } catch (error:unknown) {
        console.error("[db] MongoDB connection failed. Aborting...");
        process.exit(1)
    }
}

export default connectDB
