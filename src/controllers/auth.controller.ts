import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUserDoc, User } from '../models/user.model';
import { registerSchema } from '../validations/auth.validation';
import { IUserRequest } from '../requests/user.request';
import { z, ZodError } from 'zod';
import ValidationError from '../errors/validation-error';

export const register = async (req: Request, res: Response) => {
  try {
    const { nim, name, password, role } = req.body;

    const data: IUserRequest = registerSchema.parse({
      nim,
      name,
      password,
      role: role ?? 'student'
    } as IUserRequest);

    const existing: IUserDoc | null = await User.findOne({ nim });
    if (existing) {
      throw new ValidationError('NIM is already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
      nim: data.nim,
      name: data.name,
      role: data.role,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    if(err instanceof ZodError) {
      const validationError = ValidationError.fromZod(err);
      return res.status(400).json(validationError.getMessage());
    }
    if(err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};
