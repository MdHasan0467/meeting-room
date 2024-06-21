import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserSchema),
  UserControllers.createUser
);

router.post(
  "/login",
  validateRequest(UserValidations.loginUserSchema),
  UserControllers.loginUser
);

export const UserRoutes = router;
