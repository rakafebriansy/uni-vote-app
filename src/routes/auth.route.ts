import express, { Request, Response } from 'express';
import { login, register } from '../controllers/auth.controller';
import authenticate from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/register', register as any);
router.post('/login', login as any);

// auth middleware
router.use(authenticate as any);

router.get('/test', (req: Request, res: Response) => {
    res.json({message:'success'});
});
export default router;