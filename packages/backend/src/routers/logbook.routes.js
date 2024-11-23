/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import logbookController from '../controllers/logbook';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', logbookController.onReadAll);
router.get('/:id', logbookController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, logbookController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, logbookController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  logbookController.onDeleteOne,
);

export default router;
