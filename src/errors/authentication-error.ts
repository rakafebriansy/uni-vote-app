export default class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Authentication Error";
    }

    getMessage() {
        return {
            errors: {
                name: this.name,
                message: `Access denied: ${this.message}`
            }
        };
    }
}