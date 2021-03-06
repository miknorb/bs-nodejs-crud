import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import {AppConfiguration} from "./app-configuration";
import {router} from "./api/router";
import "./db";
import bodyParser from "body-parser";
import InvalidUserIdError from "./errors/invalid-user-id-error";
import UserNotFoundError from "./errors/user-not-found-error";
import InvalidTaskIdError from "./errors/invalid-task-id-error";
import TaskNotFoundError from "./errors/task-not-found-error";
import {startCronService} from "./jobs/cron-service";

export const app = express();
const {port} = AppConfiguration.express;

app.use(bodyParser.json());
app.use(cors());

app.use(AppConfiguration.api.prefix, router);

startCronService("updateTasks", "* * * * *");

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof InvalidUserIdError) {
        err = new UserNotFoundError({id: req.params.userid});
    }
    if (err instanceof InvalidTaskIdError) {
        err = new TaskNotFoundError({id: req.params.taskid})
    }
    err.code = err.code ?? 500;
    console.error(`API Error - code: ${err.code} - message: ${err.message} - stacktrace:`, err.stack ?? "Stacktrace not available");
    res.status(err.code);
    res.json({error: {message: err.message ?? err}});
};
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}`));