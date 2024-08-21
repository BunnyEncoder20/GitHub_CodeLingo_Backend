import mongoose from "mongoose";
import { DB_name } from "../constants";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        // console.log(connectionInstance);
        console.log(`MongoDB connection successful !!! \nDB Host : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("[db] MongoDB connection failed. Aborting...");
        process.exit(1)
    }
}

export default connectDB
