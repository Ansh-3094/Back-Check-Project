import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; //This package helps to access and set cookies of user's browers from our server, In short CRUD operations.

const app = express();

const rawCorsOrigin = process.env.CORS_ORIGIN?.trim();
const allowedOrigins = rawCorsOrigin
  ? rawCorsOrigin
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : ["http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow tools/server-to-server calls that do not send Origin header.
    if (!origin) {
      return callback(null, true);
    }

    // With credentials enabled, wildcard cannot be used. Reflect localhost during development.
    if (allowedOrigins.includes("*")) {
      return callback(null, origin);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" })); //How much big json DATA we wanna take from users. We set limit here.
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //To handle DATA that is coming from URL.
app.use(express.static("public")); //This is for Files likePDFs,Photos that we want to store as public files.
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);

export { app };
