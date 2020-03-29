import {BaseAPIError} from "./base-api-error";

export default class InvalidUserIdError extends BaseAPIError {
    constructor(id: string) {
        super(400, `Invalid objectId: ${id}`);
    }
}