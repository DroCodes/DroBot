import mongoose from 'mongoose'
import 'dotenv/config'

const uri = process.env.MONGO_URI!
export const database = async () => {
    const DBConnection = await mongoose.connect(uri)
    console.log("Connected to DB")
};