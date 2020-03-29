import mongoose from "mongoose";
import {AppConfiguration} from "./app-configuration";
mongoose.connect(AppConfiguration.db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.on("error", args => {
    console.error("Mongoose database connection failed! - reason: ", args);
    process.exit(1);
});
mongoose.connection.on("open", () => {
    console.log(`Mongoose database connection successful to ${AppConfiguration.db}`);
});
