import { z } from "zod";
import { Types } from "mongoose";

const createBookingSchema = z.object({
  body: z.object({
    date: z
      .string({ message: "Date is required" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
    slots: z.array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid slot ID",
      })
    ),
    room: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid room ID",
    }),
    user: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid user ID",
    }),
  }),
});

const updateBookingSchema = z.object({
  body: z.object({
    date: z
      .string({ message: "Date is required" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD")
      .optional(),
    slots: z
      .array(
        z.string().refine((val) => Types.ObjectId.isValid(val), {
          message: "Invalid slot ID",
        })
      )
      .optional(),
    room: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid room ID",
      })
      .optional(),
    user: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid user ID",
      })
      .optional(),
  }).optional(),
});

export const BookingValidations = {
  createBookingSchema,
  updateBookingSchema,
};
