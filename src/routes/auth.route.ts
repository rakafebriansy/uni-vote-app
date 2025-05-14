import express, { Request, Response } from 'express';
import { login, register } from '../controllers/auth.controller';
import authenticate from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register as any);
router.post('/login', login as any);

router.get('/auth/test', authenticate as any, (req: Request, res: Response) => {
    res.json({message:'success'});
});
export default router;