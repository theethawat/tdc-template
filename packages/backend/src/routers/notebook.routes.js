/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import notebookController from '../controllers/notebook';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', notebookController.onReadAll);
router.get('/:id', notebookController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, notebookController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, notebookController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  notebookController.onDeleteOne,
);

export default router;
