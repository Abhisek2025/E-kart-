import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "E-kart-YT",

      // 🔥 Performance & stability options
      maxPoolSize: 10,              // connection pool
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000, // fail fast
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      compressors: ["zlib"],        // reduce network payload
    });

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
