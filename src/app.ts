import express, {NextFunction, Request, Response} from "express";
import {AppConfiguration} from "./app-configuration";
import {router} from "./routes/router";
import "./db";
import bodyParser from "body-parser";
import {BaseAPIError} from "./errors/base-api-error";

const app = express();
const {port} = AppConfiguration.express;

app.use(bodyParser.json());

app.use("/api", router);

const errorHandler = (err: BaseAPIError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500);
    res.json({error: {message: err.message || err}});
};
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}`));