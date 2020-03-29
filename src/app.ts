import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import {AppConfiguration} from "./app-configuration";
import {router} from "./routes/router";
import "./db";
import bodyParser from "body-parser";
import InvalidUserIdError from "./errors/invalid-user-id-error";
import UserNotFoundError from "./errors/user-not-found-error";

const app = express();
const {port} = AppConfiguration.express;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof InvalidUserIdError) {
        err = new UserNotFoundError({id: req.params.userid});
    }
    err.code = err.code ?? 500;
    console.error(`API Error - code: ${err.code} - message: ${err.message} - stacktrace:`, err.stack ?? "Stacktrace not available");
    res.status(err.code);
    res.json({error: {message: err.message ?? err}});
};
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}`));