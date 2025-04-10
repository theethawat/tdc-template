import mongoose from "mongoose";
import dayjs from "dayjs";

export const createMainPipeline = (req) => {
  const pipeline = [];

  if (req?.query?.name) {
    pipeline.push({
      $match: {
        name: {
          $regex: req?.query?.name,
          $options: "i",
        },
      },
    });
  }

  if (req?.query?.startDate) {
    pipeline.push({
      $match: {
        date: {
          $gte: dayjs(req?.query?.startDate).startOf("day").toDate(),
        },
      },
    });
  }

  if (req?.query?.endDate) {
    pipeline.push({
      $match: {
        date: {
          $lte: dayjs(req?.query?.endDate).endOf("day").toDate(),
        },
      },
    });
  }

  return pipeline;
};

export const createLookupPipeline = (req) => {
  const pipeline = [];

  return pipeline;
};
