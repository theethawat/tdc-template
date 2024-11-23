import express from 'express';
import userRouter from './user';
import projectRoute from './project.routes';
import timelineRoute from './timeline.routes';
import logbookRoute from './logbook.routes';
import notebookRoute from './notebook.routes';

import asset from './asset.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/project', projectRoute);
router.use('/timeline', timelineRoute);
router.use('/logbook', logbookRoute);
router.use('/notebook', notebookRoute);
router.use('/asset', asset);

export default router;
