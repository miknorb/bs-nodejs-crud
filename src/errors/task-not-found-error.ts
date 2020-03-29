import {BaseAPIError} from "./base-api-error";

export default class TaskNotFoundError extends BaseAPIError {
    constructor(identifier: {[key:string]:any}) {
        super(404, `Task not found with id: ${JSON.stringify(identifier)}`);
    }
}