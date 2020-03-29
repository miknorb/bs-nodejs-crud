import {User} from "../models/user-model"
import MissingPropertyError from "../errors/missing-property-error";
import UserAlreadyExistsError from "../errors/user-already-exists-error";
import {IUser} from "../types";
import UserNotFoundError from "../errors/user-not-found-error";
import {Types} from "mongoose";
import InvalidUserIdError from "../errors/invalid-user-id-error";
const {ObjectId} = Types;

export async function createUser(createUserRequest: IUser) {
    const missingProperties = [];
    if (!createUserRequest.username) {
        missingProperties.push("username");
    }
    if (!createUserRequest.first_name) {
        missingProperties.push("first_name");
    }
    if (!createUserRequest.last_name) {
        missingProperties.push("last_name");
    }
    if (missingProperties.length) {
        throw new MissingPropertyError(...missingProperties);
    }
    const user = new User(createUserRequest);
    try {
        await user.save();
    } catch (err) {
        if (err.code === 11000) {
            throw new UserAlreadyExistsError();
        }
        throw err;
    }
    return user.toObject();
}

export async function getUserById(userId: string) {
    if (!ObjectId.isValid(userId)) {
        throw new InvalidUserIdError(userId)
    }
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new UserNotFoundError({id: userId});
    }
    return user.toObject();
}

export async function getAllUsers() {
    const users = await User.find().exec();
    return users.map(user => user.toObject());
}

export async function updateUser(userId: string, updateData: Partial<IUser>) {
    if (!ObjectId.isValid(userId)) {
        throw new InvalidUserIdError(userId)
    }
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new UserNotFoundError({id: userId});
    }
    user.username = updateData.username ||user.username;
    user.first_name = updateData.first_name || user.first_name;
    user.last_name = updateData.last_name || user.last_name;
    try {
        await user.save();
    } catch (err) {
        throw err;
    }
    return user.toObject();
}