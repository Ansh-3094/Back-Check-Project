//SECOND WAY:   we create one file in one folder, we write code there and export function import that function in index file

//require("dotenv").config();

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!", err);
  });

//first WAY:   this is first way written down here to work with MONGO

/*import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR:", error);
    throw error;
  }
})();
*/
