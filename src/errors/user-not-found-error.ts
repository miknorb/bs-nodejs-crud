import {BaseAPIError} from "./base-api-error";

export default class UserNotFoundError extends BaseAPIError {
    constructor(identifier: {[key:string]:any}) {
        super(404, `User not found with ${JSON.stringify(identifier)}`);
    }
}