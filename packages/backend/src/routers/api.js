import express from 'express';
import userRouter from './user.routes';
import departmentRouter from './department.routes';
import goodsRouter from './goods.routes';
import customerRouter from './customer.routes';
import goodsTypeRouter from './goodsType.routes';
/** Place For Import */

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/department', departmentRouter);
router.use('/goods', goodsRouter);
router.use('/customer', customerRouter);
router.use('/goods-type', goodsTypeRouter);
/** Place For Use */

export default router;

/** ห้ามลบคอมเมนต์ที่เขียนว่า Place For Import และ Place For Use เด็ดขาด เพราะวาง Script */
