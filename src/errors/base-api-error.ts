export abstract class BaseAPIError extends Error {
    protected constructor(public readonly code: number, public readonly message: string = "") {
        super(message);
    }
}
