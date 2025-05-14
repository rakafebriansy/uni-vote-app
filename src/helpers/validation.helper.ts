import { ValidationErrorType } from "../types/validation.type";

const validationErrorMessages: Record<ValidationErrorType, string> = {
    [ValidationErrorType.MINCHAR]: '{field} must be at least {value} characters',
    [ValidationErrorType.MAXCHAR]: '{field} must be at most {value} characters',
    [ValidationErrorType.LENGTHCHAR]: '{field} must be {value} characters long',
    [ValidationErrorType.REQUIRED]: '{field} cannot be null',
};

export default class ValidationHelper {
    static setErrorMessage(validationErrorType: ValidationErrorType, fieldName: string, value?: any): string {
        const template = validationErrorMessages[validationErrorType];
        return template
          .replace('{field}', fieldName)
          .replace('{value}', value?.toString() ?? 'N/A');
      }
}