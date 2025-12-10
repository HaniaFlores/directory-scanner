/**
 * Custom error thrown when a provided path is not valid
 * or does not exist.
 */

export class InvalidPathError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidPathError";
    }
}


/**
 * Custom error thrown when the program does not have permission
 * to access a directory or file on the system.
 */
export class PermissionDeniedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PermissionDeniedError";
    }
}
