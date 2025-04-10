import Mongoose from 'mongoose';
import GeneralController from './GeneralController';
import AssetModel from '../models/Asset';
import uploadService from '../utils/uploadService';

const AssetService = new GeneralController(AssetModel, 'asset');

export const onReadAll = async (req, res) => {
  try {
    let query = {};

    if (req?.query?.project) {
      query = {
        $or: [
          {
            project: Mongoose.Types.ObjectId(req?.query?.project),
          },
        ],
      };
    }

    if (req?.query?.notebook) {
      query = {
        $or: [
          {
            notebook: Mongoose.Types.ObjectId(req?.query?.notebook),
          },
        ],
      };
    }
    const result = await AssetService.getAll({
      ...req.query,
      query,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const result = await AssetService.getOne(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await AssetService.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await AssetService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await AssetService.deleteOne(req.params.id);
    res.status(204).send({ message: 'Delete Success' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onUploadFile = async (req, res) => {
  try {
    const fileSize = parseInt(req.headers['content-length'], 10);
    const imageURL = await uploadService(req?.file, fileSize);
    const result = await AssetService.createOne({
      url: imageURL,
      ...req?.body,
    });
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  onReadAll,
  onReadOne,
  onCreateOne,
  onEditOne,
  onDeleteOne,
  onUploadFile,
};
