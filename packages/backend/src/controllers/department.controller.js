import hash from 'object-hash';
import GeneralController from '../class/GeneralController';
import DepartmentModel from '../models/Department';
import {
    createLookupPipeline,
    createMainPipeline,
  } from '../pipeline/department.pipeline';

const MainController = new GeneralController(DepartmentModel );


export const onReadAll = async (req, res) => {
  try {
    const pipeline = createMainPipeline(req);
    const lookupPipeline = createLookupPipeline(req);
    const result = await MainController.aggregation({
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
    const lookupPipeline = createLookupPipeline(req);
    const result = await MainController.getOneAggregate({
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
    const result = await MainController.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error('error', error);
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await MainController.updateOne(req.params.id, req.body);

    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await MainController.deleteOne(req.params.id);
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
