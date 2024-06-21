import { Types } from "mongoose";

export interface TSlot {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
