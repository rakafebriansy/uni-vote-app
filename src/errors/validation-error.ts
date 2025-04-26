import { z } from "zod";

export default class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Validation Error";
    }

    static fromZod(error: Error) {
        if (error instanceof z.ZodError) {
            const messages: string[] = error.errors.map(err => err.message);
            return new ValidationError(messages[0]);
        }
        return new ValidationError(error.message ?? 'Internal server Error');
    }

    getMessage() {
        return {
            errors: {
                name: this.name,
                message: this.message
            }
        };
    }
}