export default class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Not Found Error";
    }

    getMessage() {
        return {
            errors: {
                name: this.name,
                message: `${this.message}`
            }
        };
    }
}