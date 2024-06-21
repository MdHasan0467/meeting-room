import { Schema, model, Document } from "mongoose";
import { TRoom } from "./room.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const RoomSchema = new Schema<TRoom>(
  {
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// checking if the room no is already exists
RoomSchema.pre("save", async function (next) {
  const existingRoom = await Room.findOne({ roomNo: this.roomNo });

  if (existingRoom) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "This room no. is already exists"
    );
  }

  next();
});

// avoid deleted rooms in return using id
RoomSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

// avoid deleted rooms in return using find
RoomSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

export const Room = model<TRoom>("Room", RoomSchema);
