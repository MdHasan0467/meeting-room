import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const SlotSchema = new Schema<TSlot>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Slot = model<TSlot>("Slot", SlotSchema);
