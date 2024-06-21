import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";

// create a room
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

// get a room by id
const getRoomByIdFromDB = async (id: string) => {
  const result = await Room.findById(id);

  return result;
};

//   get all rooms
const getAllRoomsFromDB = async () => {
  const result = await Room.find();

  return result;
};

//   update room by id
const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getRoomByIdFromDB,
  getAllRoomsFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
