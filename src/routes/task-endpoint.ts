import {Router} from "express";

export const taskRouter = Router({mergeParams: true});
// # Get all tasks for user
taskRouter.get("/", (req, res, next) => {

});
// # Create new task for user
taskRouter.post("/", (req, res, next) => {

});
// # Update existing task for user
taskRouter.put("/:taskid", (req, res, next) => {

});
// # Delete existing task for user
taskRouter.delete("/:taskid", (req, res, next) => {

});
// # Get existing task for user
taskRouter.get("/:taskid", (req, res, next) => {
    res.send(req.params);
});
