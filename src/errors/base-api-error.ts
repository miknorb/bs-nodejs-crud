export abstract class BaseAPIError {
    constructor(public readonly code: number, public readonly message?: string) {
    }
}
