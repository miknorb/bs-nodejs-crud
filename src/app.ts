import express from "express";
import {AppConfiguration} from "./app-configuration";
import {router} from "./routes/router";

const app = express();
app.use("/api", router);
const {port} = AppConfiguration.express;
app.listen(port, () => console.log(`App listening on port ${port}`));