import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // checking if the token is missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route!"
      );
    }

    // get the actual token
    const token = authHeader.split(" ")[1];

    // checking if the given token is valid
     const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userEmail } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(userEmail);

    // if user is not exist
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Unauthorized user!");
    }

    // if role does not match with the request
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route!"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
