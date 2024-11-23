/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import multer from 'multer';
import assetController from '../controllers/asset';

import config from '../configs/app';
import authMiddleWare from '../middleware/auth';

const router = express.Router();
const storage = multer.memoryStorage();

const fileFilter = function fileFilter(req, _file, cb) {
  const fileSize = parseInt(req.headers['content-length'], 10);
  console.log('file size', fileSize);
  if (fileSize > config.maxUploadFileSize) {
    return cb(new Error('contents larger limit'));
  }
  cb(null, true);
};

const limits = {
  limits: {
    fileSize: config.maxUploadFileSize,
  },
};

const upload = multer({ storage, fileFilter, limits });

router.get('/', assetController.onReadAll);
router.get('/:id', assetController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, assetController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, assetController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  assetController.onDeleteOne,
);
router.post(
  '/upload',
  authMiddleWare.verifyRequest,
  upload.single('files'),
  assetController.onUploadFile,
);

export default router;
