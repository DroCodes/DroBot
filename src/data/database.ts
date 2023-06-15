import mongoose from 'mongoose'
import 'dotenv/config'

export default {
    uri: process.env.MONGO_URI!,
    async connect(){
        const DBConnection = await mongoose.connect(this.uri)
        console.log("Connected to DB")
    }
};