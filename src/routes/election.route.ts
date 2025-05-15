import express, { Request, RequestHandler, Response } from 'express';
import authenticate from '../middlewares/auth.middleware';
import isAdmin from '../middlewares/is-admin.middleware';
import { create, search } from '../controllers/election.controller';

const router = express.Router();

router.use(authenticate as RequestHandler);

router.post('/', isAdmin as RequestHandler, create as any);
router.get('/', search as any);

export default router;