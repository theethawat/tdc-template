import GeneralController from './GeneralController';
import TimelineModel from '../models/Timeline';

// It use the same, so we will not write it again we use from logbook
import { createMainPipeline } from '../pipeline/timeline.pipeline';

const TimelineService = new GeneralController(TimelineModel, 'timeline');

export const onReadAll = async (req, res) => {
  try {
    const pipeline = createMainPipeline(req);
    const lookupPipeline = [];
    const result = await TimelineService.aggregation({
      page: req?.query?.page,
      size: req?.query?.size,
      pipeline,
      lookupPipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const pipeline = createMainPipeline(req);
    const lookupPipeline = [];
    const result = await TimelineService.getOneAggregate({
      id: req.params.id,
      pipeline,
      lookupPipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await TimelineService.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await TimelineService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await TimelineService.deleteOne(req.params.id);
    res.status(204).send({ message: 'Delete Success' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export default {
  onReadAll,
  onReadOne,
  onCreateOne,
  onEditOne,
  onDeleteOne,
};
