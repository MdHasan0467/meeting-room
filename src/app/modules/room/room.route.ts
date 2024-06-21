import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidations } from "./room.validation";
import { RoomControllers } from "./room.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// post new room
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.createRoomSchema),
  RoomControllers.createRoom
);

router.get("/:id", RoomControllers.getRoomById); //get single room

router.get("/", RoomControllers.getAllRooms); // get all rooms

// update room by id
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.updateRoomSchema),
  RoomControllers.updateRoom
);

router.delete("/:id", auth(USER_ROLE.admin), RoomControllers.deleteRoom); // delete room by id

export const RoomRoutes = router;
