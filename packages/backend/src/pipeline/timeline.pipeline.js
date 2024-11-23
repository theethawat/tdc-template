/* eslint-disable import/prefer-default-export */
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
        project: mongoose.Types.ObjectId(req?.query?.project),
      },
    });
  }

  if (req?.query?.user) {
    pipeline.push({
      $match: {
        user: mongoose.Types.ObjectId(req?.query?.user),
      },
    });
  }

  if (req?.query?.completed) {
    pipeline.push({
      $match: {
        completed: true,
      },
    });
  }
  return pipeline;
};
