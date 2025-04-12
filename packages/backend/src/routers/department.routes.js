/* eslint-disable import/no-named-as-default-member */
import express from 'express';

import authMiddleWare from '../middleware/auth';
import userController from '../controllers/user.controller';

const router = express.Router();

router.get(
  '/',
  authMiddleWare.verifyRequest,
  userController.onGetAllDepartments,
);

export default router;
