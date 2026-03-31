import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//We established Database connection here.
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing in backend/.env");
    }

    const normalizedUri = mongoUri.endsWith("/")
      ? `${mongoUri}${DB_NAME}`
      : `${mongoUri}/${DB_NAME}`;

    const connectionInstance = await mongoose.connect(normalizedUri, {
      // Prefer IPv4 on some local Windows/ISP setups where IPv6 routes fail.
      family: 4,
      serverSelectionTimeoutMS: 15000,
    });

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB connection FAILED", error?.message || error);

    if (error?.name === "MongooseServerSelectionError") {
      console.log(
        "Atlas connectivity hints: whitelist your current IP in Atlas Network Access, verify cluster is not paused, and confirm DB user credentials are valid."
      );
    }

    process.exit(1);
  }
};

export default connectDB;
