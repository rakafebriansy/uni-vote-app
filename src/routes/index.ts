import { Router } from 'express';
import authRoutes from './auth.route';
const router = Router();

router.use('/', authRoutes);

export default router;