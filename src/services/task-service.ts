import {ITask, TaskModel} from "../types";
import {Types} from "mongoose";
import {getUserById} from "./user-service";
import MissingPropertyError from "../errors/missing-property-error";
import ValidationError from "../errors/validation-error";
import InvalidTaskIdError from "../errors/invalid-task-id-error";
import TaskNotFoundError from "../errors/task-not-found-error";
const {ObjectId} = Types;

export async function createTask(userId: string, createTaskRequest: ITask) {
    const user = await getUserById(userId);
    const missingProperties: string[] = [];
    if (!createTaskRequest.name) {
        missingProperties.push("name");
    }
    if (!createTaskRequest.description) {
        missingProperties.push("description");
    }
    if (!createTaskRequest.date_time) {
        missingProperties.push("date_time");
    }
    if (missingProperties.length) {
        throw new MissingPropertyError(...missingProperties);
    }
    user.tasks.push(createTaskRequest);
    try {
        await user.save();
    } catch(err) {
        if (err.name == "ValidationError") {
            throw new ValidationError(err.message);
        }
        throw err;
    }
    return user;
}

export async function updateTask(userId: string, taskId: string, updateData: Partial<ITask>) {
    const user = await getUserById(userId);
    if (!ObjectId.isValid(taskId)) {
        throw new InvalidTaskIdError(taskId);
    }
    const task = user.tasks.find(task => task._id == taskId);
    console.log("loggin found task", task);
    if (!task) {
        throw new TaskNotFoundError({id: taskId});
    }
    task.name = updateData.name || task.name;
    task.description = updateData.description || task.description;
    task.date_time = updateData.date_time || task.date_time;
    task.status = updateData.status || task.status;
    try {
        await user.save();
    } catch(err) {
        if (err.name == "ValidationError") {
            throw new ValidationError(err.message);
        }
        throw err;
    }
    return task;
}

export async function deleteTask(userId: string, taskId: string) {
    const task = await getTaskById(userId, taskId);
    await task.remove();
    return task;
}

export async function getTaskById(userId: string, taskId: string) {
    if (!ObjectId.isValid(taskId)) {
        throw new InvalidTaskIdError(taskId)
    }
    const user = await getUserById(userId);
    const task = await user.tasks.id(taskId) as TaskModel;
    if (!task) {
        throw new TaskNotFoundError({id: taskId});
    }
    return task;
}


export async function getAllTasks(userId: string) {
    return (await getUserById(userId)).tasks;
}
