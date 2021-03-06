export default class InvalidUserIdError extends Error {
    constructor(id: string) {
        super(`Invalid user ObjectId format: ${id}`);
    }
}