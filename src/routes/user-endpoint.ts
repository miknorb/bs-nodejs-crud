import {Router} from "express";
export const userRouter = Router();

// # Create new user
userRouter.post("/", (req, res, next) => {

});
// # Get all users
userRouter.get("/", (req, res, next) => {
});
// # Update existing user
userRouter.put("/:userid", (req, res, next) => {

});
// # Get existing user info
userRouter.get("/:userid", (req, res, next) => {
    res.send(req.params);
});

