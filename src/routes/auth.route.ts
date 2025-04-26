import express from 'express';
import { login, register } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register as any);
router.post('/login', login as any);

export default router;