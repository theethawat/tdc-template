import GeneralController from './GeneralController';
import UserModel from '../models/User';
import middleware from '../middleware/auth';

const UserFromMainService = new GeneralController(UserModel, 'user');

export const getUserAfterLogin = async (data) => {
  try {
    const payload = {
      ...data,
      authToken: middleware.generateToken({ username: data?.username }),
    };
    return payload;
  } catch (error) {
    throw Error('LOGIN_FAIL Logging in Fail cannot find user');
  }
};

export const onReadAll = async (req, res) => {
  try {
    const pipeline = [];
    const lookupPipeline = [];
    const result = await UserFromMainService.aggregation({
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
    const pipeline = [];
    const lookupPipeline = [];
    const result = await UserFromMainService.getOneAggregate({
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
    const result = await UserFromMainService.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error('error', error);
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await UserFromMainService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await UserFromMainService.deleteOne(req.params.id);
    res.status(204).send({ message: 'Delete Success' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onLogin = async (req, res) => {
  try {
    console.log('On Login');
    const result = await getUserAfterLogin(req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(403).send({ error });
  }
};

export default {
  onReadAll,
  onReadOne,
  onCreateOne,
  onEditOne,
  onDeleteOne,
  onLogin,
};
