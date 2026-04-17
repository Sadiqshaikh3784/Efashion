import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
           "mongodb+srv://sadiqshaikh3784_db_user:SADIQ111@cluster0.r36kbed.mongodb.net/wear-web"
        );

        console.log("MongoDB connected successfully ✅");
        console.log("Connected DB:", mongoose.connection.name);
    } catch (error) {
        console.error(`Error: ${error.message}`); // ✅ FIXED
        process.exit(1); // optional but recommended
    }
};

export default connectDB;