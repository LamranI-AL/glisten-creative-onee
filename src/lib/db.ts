import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI as string;
const connectDb = async () => {
  if (mongoose.connection.readyState == 1) {
    console.log("you are already connected to the database");
    return;
  }
  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });
    console.log("you are connecting to the database");
  } catch (error) {
    console.error("ca not connect to mongodb : " + error);
    throw new Error("error of connecting to mongodb");
  }
};

export default connectDb;
