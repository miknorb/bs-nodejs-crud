import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/bs-crud", {useNewUrlParser: true});
mongoose.connection.on("error", args => {
    console.error("Mongoose database connection failed! - reason: ", args);
    process.exit(1);
});
mongoose.connection.on("open", () => {
    console.log("Mongoose database connection successful!");
});
