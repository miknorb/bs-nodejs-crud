import {model, Model, Schema} from "mongoose";
import {TaskModel} from "../types";

const taskSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "done"],
        default: "pending"
    },
    date_time: {
        type: Date,
        required: true
    }
}, {autoIndex: true, versionKey: false});

export const Task: Model<TaskModel> = model<TaskModel>("Task", taskSchema);