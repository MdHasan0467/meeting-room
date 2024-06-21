import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TRole = 'user' | 'admin';

// signup
export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
}

// login
export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
