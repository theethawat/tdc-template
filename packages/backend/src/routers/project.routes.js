/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import projectController from '../controllers/project';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', projectController.onReadAll);
router.get('/:id', projectController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, projectController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, projectController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  projectController.onDeleteOne,
);

export default router;
