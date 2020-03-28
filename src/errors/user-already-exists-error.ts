import {BaseAPIError} from "./base-api-error";

export default class UserAlreadyExistsError extends BaseAPIError {
    constructor() {
        super(409, "User with that username already exists!");
    }
}