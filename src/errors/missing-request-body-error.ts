import {BaseAPIError} from "./base-api-error";

export default class MissingRequestBodyError extends BaseAPIError {
    constructor() {
        super(400, `Request body missing!`);
    }
}