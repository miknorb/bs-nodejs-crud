import {Document, Types} from "mongoose";

export interface IUser {
    username: string;
    first_name: string;
    last_name: string;
    tasks: ITask[];
    _id: string
}

export interface ITask {
    name: string;
    description: string;
    date_time: Date,
    status: TaskStatus
    _id: string;
}

export type UserModel = Document & IUser & {tasks: ITask[] & Types.Subdocument};

export type TaskModel = Document & ITask;

export type TaskStatus = "pending" | "done"