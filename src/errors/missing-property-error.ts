import {BaseAPIError} from "./base-api-error";

export default class MissingPropertyError extends BaseAPIError {
    constructor(...properties: string[]) {
        super(400, `Missing required properties: ${properties}`);
    }
}