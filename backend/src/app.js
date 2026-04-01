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
import likeRouter from "./routes/like.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);

app.use((err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err?.errors || [],
  });
});

export { app };
