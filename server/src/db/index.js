import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`db connection on port ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log(`mongodb connection error ${error}`)

        
    }
}

export default connectDB;
