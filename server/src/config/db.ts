import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://root:root123@localhost:27017";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
