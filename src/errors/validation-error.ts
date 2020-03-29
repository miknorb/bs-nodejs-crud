import {BaseAPIError} from "./base-api-error";

export default class ValidationError extends BaseAPIError {
    constructor(msg: string) {
        super(422, msg);
    }
}