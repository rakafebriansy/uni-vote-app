import { Router } from 'express';
import authRoutes from './auth.route';
import electionRoutes from './election.route';
const router = Router();

router.use('/', authRoutes);
router.use('/elections', electionRoutes);

export default router;