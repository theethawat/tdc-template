/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import timelineController from '../controllers/timeline';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', timelineController.onReadAll);
router.get('/:id', timelineController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, timelineController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, timelineController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  timelineController.onDeleteOne,
);

export default router;
