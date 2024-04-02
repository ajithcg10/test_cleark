import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "clerk-next14-db",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

    isConnected = true;

    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(error);
  }
};