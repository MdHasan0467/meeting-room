import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { Room } from "../room/room.model";

const BookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isConfirmed: { type: String, default: "unconfirmed" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// generating totalAmount
BookingSchema.virtual("totalAmount").get(function () {
  const pricePerSlot = this?.room?.pricePerSlot;

  if (!this.room || !pricePerSlot) {
    return 0;
  }
  return pricePerSlot * this.slots.length;
});

// avoid deleted rooms in return using id
BookingSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

// avoid deleted rooms in return using find
BookingSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

export const Booking = model<TBooking>("Booking", BookingSchema);
