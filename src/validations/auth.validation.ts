import { z } from 'zod';
import { ValidationErrorType as Type } from '../types/validation.type';
import VEMH from '../helpers/validation.helper';
import { RoleType } from '../types/user.type';

export const registerSchema = z.object({
  nim: z.string().length(12, VEMH.setErrorMessage(Type.LENGTHCHAR, 'NIM', 12)),
  name: z.string().min(1, VEMH.setErrorMessage(Type.REQUIRED, 'Name')),
  password: z.string().min(6, VEMH.setErrorMessage(Type.MINCHAR, 'Password', 6),),
  role: z.nativeEnum(RoleType),
});

export const loginSchema = z.object({
  nim: z.string(),
  password: z.string(),
});