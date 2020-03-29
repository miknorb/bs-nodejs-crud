export default class InvalidTaskIdError extends Error {
    constructor(id: string) {
        super(`Invalid user ObjectId format: ${id}`);
    }
}