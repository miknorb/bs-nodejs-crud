import {BaseAPIError} from "./base-api-error";

export default class MissingPropertyError extends BaseAPIError {
    constructor(...properties: string[]) {
        super(422, `Missing required properties: ${properties}`);
    }
}
