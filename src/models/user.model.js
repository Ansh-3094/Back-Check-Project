import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      //username here is feild name.
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //If u want to enable searching feild of any feild(in this case username) u do index:true.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //We use cloudinary url
      required: true,
    },

    coverImage: {
      type: String,
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Passowrd Is Requird"], //We can add a custom error message with true.
      trim: true,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//We use pre here bcz we want to perform something(any action) JUST BEFORE SAVING THE DATA; EX: Just before saving data encrypt it, and then save it.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Authentication:   This is for compare user password and stored password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//This is JWT(what is payload?)
// Syntax:   jwt.sign(payload, secretKey, options)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
