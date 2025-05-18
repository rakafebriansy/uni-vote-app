import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../requests/auth.request';

const isNotAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (user.role == 'admin') {
    return res.status(403).json({ message: 'Forbidden: Users only' });
  }

  next();
}

export default isNotAdmin;