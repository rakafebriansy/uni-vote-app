export const ELECTION_PAGE_DEFAULT = 1;
export const ELECTION_PER_PAGE_DEFAULT = 1;
export enum ValidationErrorEnum {
    MINCHAR = 1,
    MAXCHAR = 2,
    LENGTHCHAR = 3,
    REQUIRED = 4,
    DATE = 5,
    MINARRAY = 6,
}
export enum RoleEnum {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}