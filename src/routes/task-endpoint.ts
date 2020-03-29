import {Router} from "express";
import {createTask, deleteTask, getAllTasks, getTaskById, updateTask} from "../services/task-service";
import MissingRequestBodyError from "../errors/missing-request-body-error";
import MissingRequestParamError from "../errors/missing-request-param-error";

export const taskRouter = Router({mergeParams: true});
// # Get all tasks for user
taskRouter.get("/", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    try {
        const response = await getAllTasks(req.params.userid);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});
// # Create new task for user
taskRouter.post("/", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    if (!req.body)
        return next(new MissingRequestBodyError());
    try {
        const response = await createTask(req.params.userod, req.body);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});
// # Update existing task for user
taskRouter.put("/:taskid", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    if (!req.params.taskid)
        return next(new MissingRequestParamError("taskid"));
    if (!req.body)
        return next(new MissingRequestBodyError());
    try {
        const response = updateTask(req.params.userid, req.params.taskid, req.body);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});
// # Delete existing task for user
taskRouter.delete("/:taskid", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    if (!req.params.taskid)
        return next(new MissingRequestParamError("taskid"));
    try {
        const response = deleteTask(req.params.userid, req.params.taskid);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});
// # Get existing task for user
taskRouter.get("/:taskid", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    if (!req.params.taskid)
        return next(new MissingRequestParamError("taskid"));
    try {
        const response = getTaskById(req.params.userid, req.params.taskid);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});
