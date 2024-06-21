import mongoose from "mongoose";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;
  const slotDuration = 60; // Slot duration in minutes

  // Convert time strings to minutes since midnight
  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

  // Check if start time is greater than or equal to end time
  if (startMinutes >= endMinutes) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Start time must be less than end time"
    );
  }

  // Calculate total duration in minutes
  const totalDuration = endMinutes - startMinutes;

  // Calculate the number of slots
  const numberOfSlots = totalDuration / slotDuration;

  // Generate slots using Array.from
  const slots: Partial<TSlot>[] = Array.from(
    { length: numberOfSlots },
    (_, i) => {
      const slotStartMinutes = startMinutes + i * slotDuration;
      const slotEndMinutes = slotStartMinutes + slotDuration;

      const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(2, "0")}:${String(slotStartMinutes % 60).padStart(2, "0")}`;
      const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, "0")}:${String(slotEndMinutes % 60).padStart(2, "0")}`;

      return {
        room: new mongoose.Types.ObjectId(room),
        date,
        startTime: slotStartTime,
        endTime: slotEndTime,
        isBooked: false,
      };
    }
  );

  // Save slots to the database
  const result = await Slot.insertMany(slots);
  return result;
};

const getAvailableSlotsFromDB = async (date?: string, roomId?: string) => {
  const query: any = { isBooked: false };

  if (date) {
    query.date = date;
  }

  if (roomId) {
    query.room = roomId;
  }

  const result = await Slot.find(query).populate("room");
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
};
