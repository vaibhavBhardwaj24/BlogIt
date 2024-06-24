import mongoose,{ mongo } from "mongoose";
import { DB_NAME } from "../constraint.js";
const connectDB=async ()=>{
    try {
        // console.log("just before connect");
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log("connected to database");
    } catch (error) {
        console.error(error);
    }
}
export default connectDB;