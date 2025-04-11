export const createMainPipeline = (req) => {
  const pipeline = [];

  if (req?.query?.name) {
    pipeline.push({
      $match: {
        name: {
          $regex: req?.query?.name,
          $options: 'i',
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
