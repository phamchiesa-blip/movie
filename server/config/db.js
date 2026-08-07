import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGOOSE_URI;
        if (!uri) {
            throw new Error('MONGOOSE_URI is not defined. Make sure .env is loaded and the variable is set.');
        }
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch(error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;