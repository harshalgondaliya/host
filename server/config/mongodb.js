import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    mongoose.connection.on("connected", () => console.log("MongoDB connected successfully"));
    mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
    mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected"));
    
    // Connect with connection options
    await mongoose.connect(`${process.env.MONGODB_URI}/authen`, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log("MongoDB connection initialized");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Don't exit - let the server continue to run so API calls will still work
    // Just log the error
  }
};

export default connectDB;