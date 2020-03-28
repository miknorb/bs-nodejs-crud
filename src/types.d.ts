import {Document} from "mongoose";

export interface IUser {
    username: string;
    first_name: string;
    last_name: string;
}

export type UserModel = Document & IUser;
