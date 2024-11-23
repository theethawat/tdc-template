import express from 'express';
import userRouter from './user';

import asset from './asset.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/asset', asset);

export default router;
