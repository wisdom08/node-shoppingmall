import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = process.env.MONGO_DB_URL;
        const conn = await mongoose.connect(db)
        console.log('db connected!');
    } catch (e) {
        console.log(`Error: ${e.message}`)
        process.exit(1);
    }
}

export default connectDB;