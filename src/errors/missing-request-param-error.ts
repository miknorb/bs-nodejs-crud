import {BaseAPIError} from "./base-api-error";

export default class MissingRequestParamError extends BaseAPIError {
    constructor(...params: string[]) {
        super(400, `Missing request parameters: ${params}`);
    }
}