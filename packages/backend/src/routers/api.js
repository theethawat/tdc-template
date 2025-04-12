import express from 'express';
import userRouter from './user.routes';
import departmentRouter from './department.routes';
/** Place For Import */

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/department', departmentRouter);
/** Place For Use */

export default router;

/** ห้ามลบคอมเมนต์ที่เขียนว่า Place For Import และ Place For Use เด็ดขาด เพราะวาง Script */
