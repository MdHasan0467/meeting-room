import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SlotServices } from "./slot.service";
import catchAsync from "../../utils/catchAsync";

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const slotData = req.body;

  const newSlot = await SlotServices.createSlotIntoDB(slotData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot created successfully",
    data: newSlot,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const { date, roomId } = req.query;

  const result = await SlotServices.getAvailableSlotsFromDB(
    date as string,
    roomId as string
  );

  //   if empty
  if (!result.length) {
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
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
};
