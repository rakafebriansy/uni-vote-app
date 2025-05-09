import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import AuthenticationError from '../errors/authentication-error';
import { AuthenticatedRequest } from '../requests/auth.request';

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError || JsonWebTokenError) {
      const authError = new AuthenticationError((err as TokenExpiredError || JsonWebTokenError).message);
      return res.status(401).json(authError.getMessage());
    }
    if (err instanceof AuthenticationError) {
      return res.status(401).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: (err as Error).message });

  }
};

export default authenticate;