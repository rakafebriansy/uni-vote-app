import express, { RequestHandler } from 'express';
import authenticate from '../middlewares/auth.middleware';
import isAdmin from '../middlewares/is-admin.middleware';
import { create, get, remove, search, vote } from '../controllers/election.controller';
import isNotAdmin from '../middlewares/is-not-admin.middleware';

const router = express.Router();

router.use(authenticate as RequestHandler);

router.post('/', isAdmin as RequestHandler, create as any);
router.get('/', search as any);
router.get('/:id', get as any);
router.delete('/:id', isAdmin as RequestHandler, remove as any);
router.use('/:id/vote', isNotAdmin as RequestHandler, vote as any);

export default router;