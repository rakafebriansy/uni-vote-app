import { z } from 'zod';
import { ValidationErrorEnum as Type } from '../enums/validation.enum';
import VEMH from '../helpers/validation.helper';
import { RoleEnum } from '../enums/user.enum';

export const registerSchema = z.object({
  nim: z.string().length(12, VEMH.setErrorMessage(Type.LENGTHCHAR, 'NIM', 12)),
  name: z.string().min(1, VEMH.setErrorMessage(Type.REQUIRED, 'Name')),
  password: z.string().min(6, VEMH.setErrorMessage(Type.MINCHAR, 'Password', 6),),
  role: z.nativeEnum(RoleEnum),
});

export const loginSchema = z.object({
  nim: z.string(),
  password: z.string(),
});