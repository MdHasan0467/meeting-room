import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";
import { BookingValidations } from "./booking.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/bookings/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.createBooking
);

router.get("/bookings", auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get("/my-bookings", auth(USER_ROLE.user), BookingControllers.getUserBookings);

router.put("/bookings/:id",auth(USER_ROLE.admin), BookingControllers.updateBookingInDB);

router.delete("/bookings/:id",auth(USER_ROLE.admin), BookingControllers.deleteBookingFromDB);

export const BookingRoutes = router;
