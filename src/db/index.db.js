import mongoose from "mongoose";
import { log } from "node:console";



const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
    } catch (error) {
        console.log('====================================');
        console.log("error into db connection ");
        console.log('====================================');
    }
}
export {connectDb}