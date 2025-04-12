import hash from 'object-hash';
import GeneralController from '../class/GeneralController';
import UserModel from '../models/User';
import middleware from '../middleware/auth';
import config from '../configs/app';
import {
  createLookupPipeline,
  createMainPipeline,
} from '../pipeline/user.pipeline';

const MainController = new GeneralController(UserModel, 'user');

const passwordHash = (password) =>
  hash.sha1({
    secret: config.secret,
    password,
  });

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
    const payload = req.body;

    // Hash Password Not store directly
    if (req?.body?.password) {
      payload.password = passwordHash(req.body.password);
    }

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

export const onLogin = async (req, res) => {
  try {
    console.log('On Login');
    const result = await getUserAfterLogin(req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(403).send({ error });
  }
};

// Not create department model due to it will be lot of query
// we just create as a tag and then use aggregate to find it out
export const onGetAllDepartments = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          departments: { $addToSet: '$departments' },
        },
      },
      {
        $project: {
          departments: {
            $reduce: {
              input: '$departments',
              initialValue: [],
              in: {
                $concatArrays: ['$$value', '$$this'],
              },
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            rows: '$departments',
          },
        },
      },
    ];
    const result = await UserModel.aggregate(pipeline);
    res.status(200).send(result?.[0]);
  } catch (error) {
    console.error('error', error);
    res.status(400).send({ error });
  }
};

export default {
  onReadAll,
  onReadOne,
  onCreateOne,
  onEditOne,
  onDeleteOne,
  onLogin,
  onGetAllDepartments,
};
