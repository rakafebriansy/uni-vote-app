import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  try {
    const { nim, name, role, password } = req.body;

    const existing = await User.findOne({ nim });
    if (existing) {
      return res.status(400).json({ message: 'NIM already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      nim,
      name,
      role,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    return res.status(500).json({ message: 'Error registering user', error: err });
  }
};
