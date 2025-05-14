import { ValidationErrorEnum } from "../enums/validation.enum";

const validationErrorMessages: Record<ValidationErrorEnum, string> = {
    [ValidationErrorEnum.MINCHAR]: '{field} must be at least {value} characters',
    [ValidationErrorEnum.MAXCHAR]: '{field} must be at most {value} characters',
    [ValidationErrorEnum.LENGTHCHAR]: '{field} must be {value} characters long',
    [ValidationErrorEnum.REQUIRED]: '{field} cannot be null',
    [ValidationErrorEnum.DATE]: 'Invalid date format in {field}',
    [ValidationErrorEnum.MINARRAY]: '{field} must have at least {value} elements',
};

export default class ValidationHelper {
    static setErrorMessage(validationErrorEnum: ValidationErrorEnum, fieldName: string, value?: any): string {
        const template = validationErrorMessages[validationErrorEnum];
        return template
            .replace('{field}', fieldName)
            .replace('{value}', value?.toString() ?? 'N/A');
    }
}