import { z } from "zod";
import FormatHelper from "../helpers/format.helper";

export default class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Validation Error";
    }

    static fromZod(error: any) {
        console.log(error);
        if (error instanceof z.ZodError) {
            const errors = error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            const message = errors[0].message == 'Required' ? `${FormatHelper.capitalize(errors[0].field)} field can't be null` : errors[0].message
            return new ValidationError(message);
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