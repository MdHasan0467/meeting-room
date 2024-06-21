import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.service";
import catchAsync from "../../utils/catchAsync";

// create room
const createRoom = catchAsync(async (req: Request, res: Response) => {
  const roomData = req.body;
  const newRoom = await RoomServices.createRoomIntoDB(roomData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: newRoom,
  });
});

// get room by id
const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.getRoomByIdFromDB(id);

  //   if empty
  if (!result) {
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
    message: "Room retrieved successfully",
    data: result,
  });
});
// get all rooms
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getAllRoomsFromDB();

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
    message: "Rooms retrieved successfully",
    data: result,
  });
});

// update room by id
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedRoom = await RoomServices.updateRoomIntoDB(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: updatedRoom,
  });
});

// delete the room
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedRoom = await RoomServices.deleteRoomFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room deleted successfully",
    data: deletedRoom,
  });
});

export const RoomControllers = {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
