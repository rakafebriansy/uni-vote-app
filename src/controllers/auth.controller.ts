import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUserDoc, User } from '../models/user.model';
import { loginSchema, registerSchema } from '../validations/auth.validation';
import { IUserLoginRequest, IUserRegisterRequest } from '../requests/user.request';
import { ZodError } from 'zod';
import ValidationError from '../errors/validation-error';
import jwt from 'jsonwebtoken';
import { IUserResource } from '../resources/user.resource';

export const register = async (req: Request, res: Response) => {
  try {
    const { nim, name, password, role } = req.body;

    const data: IUserRegisterRequest = registerSchema.parse({
      nim,
      name,
      password,
      role: role ?? 'student'
    } as IUserRegisterRequest);

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

    const payload: IUserResource = {
      id: String(user._id),
      nim: user.nim,
      name: user.name,
      role: user.role,
    }

    await user.save();
    return res.status(201).json({ message: 'User registered successfully', data: payload });

  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = ValidationError.fromZod(err);
      return res.status(400).json(validationError.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nim, password } = req.body;

    const data: IUserLoginRequest = loginSchema.parse({
      nim,
      password,
    } as IUserLoginRequest);

    const user = await User.findOne({ nim: data.nim });

    if (!user) {
      throw new ValidationError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError('Invalid credentials');
    }

    const payload: IUserResource = {
      id: String(user._id),
      nim: user.nim,
      name: user.name,
      role: user.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = ValidationError.fromZod(err);
      return res.status(400).json(validationError.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: (err as Error).message });
  }
};
