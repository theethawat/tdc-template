import express from 'express';
import userRouter from './user.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);

export default router;
