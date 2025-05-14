import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../requests/auth.request';

const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  next();
}

export default isAdmin;