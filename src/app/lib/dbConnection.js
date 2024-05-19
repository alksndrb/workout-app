import mongoose from "mongoose";

const MONOGODB_URI = process.env.MONOGODB_URI;

async function dbConnect() {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONOGODB_URI, {
      dbName: "workout_app",
    });
    console.log("Connected!");
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw new Error("Error in connecting to database");
  }
}
export default dbConnect;
