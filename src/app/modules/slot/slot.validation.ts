import { z } from "zod";

const createSlotSchema = z.object({
  body: z.object({
    room: z.string({ message: "Room ID is required" }),
    date: z.string({ message: "Date is required" }),
    startTime: z.string({ message: "Start time is required" }),
    endTime: z.string({ message: "End time is required" }),
  }),
});

export const SlotValidations = {
  createSlotSchema,
};
