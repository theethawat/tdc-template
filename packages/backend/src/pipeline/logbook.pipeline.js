import mongoose from 'mongoose';
import dayjs from 'dayjs';

export const createMainPipeline = (req) => {
  const pipeline = [];
  if (req?.query?.date) {
    pipeline.push({
      $match: {
        date: {
          $gte: dayjs(req?.query?.date).startOf('day').toDate(),
          $lte: dayjs(req?.query?.date).endOf('day').toDate(),
        },
      },
    });
  }

  if (req?.query?.startDate) {
    pipeline.push({
      $match: {
        date: {
          $gte: dayjs(req?.query?.startDate).startOf('day').toDate(),
        },
      },
    });
  }

  if (req?.query?.endDate) {
    pipeline.push({
      $match: {
        date: {
          $lte: dayjs(req?.query?.endDate).endOf('day').toDate(),
        },
      },
    });
  }

  if (req?.query?.project) {
    pipeline.push({
      $match: {
        project: new mongoose.Types.ObjectId(req?.query?.project),
      },
    });
  }

  if (req?.query?.user) {
    pipeline.push({
      $match: {
        user: new mongoose.Types.ObjectId(req?.query?.user),
      },
    });
  }

  if (req?.query?.public) {
    pipeline.push({
      $match: {
        private: false,
      },
    });
  }

  pipeline.push({
    $sort: { date: -1 },
  });

  return pipeline;
};

export const createLookupPipeline = (req) => {
  const pipeline = [];
  pipeline.push({
    $lookup: {
      from: 'notebooks',
      localField: 'attached_notebook',
      foreignField: '_id',
      as: 'attached_notebook',
    },
  });

  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user',
    },
  });

  pipeline.push({
    $set: {
      user: { $arrayElemAt: ['$user', 0] },
    },
  });

  return pipeline;
};
