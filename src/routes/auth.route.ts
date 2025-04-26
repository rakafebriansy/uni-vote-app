import express from 'express';
import { register } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register as any);
router.post('/login', register as any);

export default router;