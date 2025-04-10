import GeneralController from './GeneralController';
import LogbookModel from '../models/Logbook';
import {
  createLookupPipeline,
  createMainPipeline,
} from '../pipeline/logbook.pipeline';

const LogbookService = new GeneralController(LogbookModel, 'logbook');

export const onReadAll = async (req, res) => {
  try {
    const pipeline = createMainPipeline(req);
    const lookupPipeline = createLookupPipeline(req);
    const result = await LogbookService.aggregation({
      page: req?.query?.page,
      size: req?.query?.size,
      pipeline,
      lookupPipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    console.error('Error', error);
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const pipeline = createMainPipeline(req);
    const lookupPipeline = createLookupPipeline(req);
    const result = await LogbookService.getOneAggregate({
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
    const result = await LogbookService.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await LogbookService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await LogbookService.deleteOne(req.params.id);
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
