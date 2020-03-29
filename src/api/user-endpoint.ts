import {Router} from "express";
import {createUser, getAllUsers, getUserById, updateUser} from "../services/user-service";
import MissingRequestBodyError from "../errors/missing-request-body-error";
import MissingRequestParamError from "../errors/missing-request-param-error";

export const userRouter = Router({mergeParams: true});

// # Get all users
userRouter.get("/", async (req, res, next) => {
    try {
        const response = await getAllUsers();
        res.status(200);
        res.send(response)
    } catch (err) {
        next(err);
    }
});

// # Create new user
userRouter.post("/", async (req, res, next) => {
    if (!req.body)
        return next(new MissingRequestBodyError());
    try {
        const response = await createUser(req.body);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err)
    }
});

// # Update existing user
userRouter.put("/:userid", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    if (!req.body)
        return next(new MissingRequestBodyError());
    try {
        const response = await updateUser(req.params.userid, req.body);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});

// # Get existing user info
userRouter.get("/:userid", async (req, res, next) => {
    if (!req.params.userid)
        return next(new MissingRequestParamError("userid"));
    try {
        const response = await getUserById(req.params.userid);
        res.status(200);
        res.send(response);
    } catch (err) {
        next(err);
    }
});

