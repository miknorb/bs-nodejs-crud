import {Document} from "mongoose";

export interface IUser {
    username: string;
    first_name: string;
    last_name: string;
}

export type UserModel = Document & IUser;

export type TaskStatus = "pending" | "done"

export interface ITask {
    name: string;
    description: string;
    date_time: Date,
    status: TaskStatus
}

export type TaskModel = Document & ITask;