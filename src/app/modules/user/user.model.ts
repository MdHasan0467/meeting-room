import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";

// Define the schema
const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
  },
  {
    timestamps: true,
  }
);

// checking if the email address already exists before creating user
UserSchema.pre("save", async function (next) {
  const existingUser = await User.findOne({ email: this.email });

  if (existingUser) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "This email already exists"
    );
  }

  next();
});

// bcrypt the password before saving to the database
UserSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// return '' to the client, after saving password
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// cheeking if the user email do not exist
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};


// cheeking if the user is not matched
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Create and export the model
export const User = model<TUser, UserModel>("User", UserSchema);
