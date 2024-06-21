import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";
import { SlotControllers } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// create slot
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotSchema),
  SlotControllers.createSlot
);

router.get("/availability", SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
