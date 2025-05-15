import { z } from 'zod';
import { ValidationErrorEnum as Type } from '../enums/validation.enum';
import VEMH from '../helpers/validation.helper';

const candidateSchema = z.object({
    name: z.string().min(1, VEMH.setErrorMessage(Type.REQUIRED, 'Name')),
    nim: z.string().min(1, VEMH.setErrorMessage(Type.REQUIRED, 'NIM'))
});

export const electionSchema = z.object({
    title: z.string().min(1, VEMH.setErrorMessage(Type.REQUIRED, 'Title')),
    candidates: z.array(candidateSchema).min(1, VEMH.setErrorMessage(Type.MINARRAY, 'NIM')),
    expiresAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: VEMH.setErrorMessage(Type.REQUIRED, 'Expires at'),
    }),
});