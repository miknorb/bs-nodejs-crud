import {model, Model, Schema} from "mongoose";
import {UserModel} from "../types";

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


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    tasks: [taskSchema]
}, {autoIndex: true, versionKey: false});

export const User: Model<UserModel> = model<UserModel>("User", userSchema);