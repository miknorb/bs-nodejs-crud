import {model, Model, Schema} from "mongoose";
import {UserModel} from "../types";

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
    }
}, {autoIndex: true, versionKey: false});

export const User: Model<UserModel> = model<UserModel>("User", userSchema);