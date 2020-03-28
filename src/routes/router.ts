import {Router} from "express";
import {userRouter} from "./user-endpoint";
import {taskRouter} from "./task-endpoint";

export const router = Router();
router.use("/users", userRouter);
router.use("/users/:id/tasks", taskRouter);