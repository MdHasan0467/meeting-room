import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingServices } from "./booking.service";
import catchAsync from "../../utils/catchAsync";

// create a new booking
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;

  const newBooking = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: newBooking,
  });
});

// get all new bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingsFromDB();

  //   if empty
  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: result,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

// get user bookings
const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const result = await BookingServices.getUserBookingsFromDB(authHeader);

  //   if empty
  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Bookings does not exist or has been deleted",
      data: result,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

// create a new booking
const updateBookingInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isConfirmed } = req.body;
  const result = await BookingServices.updateBookingInDB(id, isConfirmed);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

// create a new booking
const deleteBookingFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingInDB,
  deleteBookingFromDB,
};
