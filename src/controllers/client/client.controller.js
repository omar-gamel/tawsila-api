const Client = require('../../models/client/client');
const { validateClient } = require('../../services/validation/client');
const ApiError = require('../../helpers/ApiError');

exports.create = async (req, res, next) => {
  const { error } = validateClient(req.body);
  try {
    if (error) throw new ApiError(400, { message: error.details[0].message });

    if (!req.file) throw new ApiError(422, { message: 'No image provided.' });

    const client = await Client.findOne({ email: req.body.email });
    if (client)
      throw new ApiError(400, { message: 'This client is already in use' });

    const createdClient = await Client({
      _id: req.user._id,
      user: req.user._id,
      location: req.body.location,
      image: req.file.path,
    }).save();
    res.status(201).send(createdClient);
  } catch (error) {
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  let { id } = req.params;
  try {
    const client = await Client.findById(id).populate('user');
    if (!client) throw new ApiError(404, { message: 'Client not Found.' });

    res.send(client);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  let page = +req.query.page || 1,
    limit = +req.query.limit;
  try {
    const clients = await Client.find()
      .populate([{ path: 'user' }])
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Client.count();
    const pageCount = Math.ceil(count / limit);

    res.status(200).send({ clients, page, pageCount, limit, count });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  let { id } = req.params;
  try {
    const client = await Client.findById(id).populate('user');
    if (!client) throw new ApiError(404, { message: 'Client not Found.' });

    await Client.deleteOne({ user: id });
    res.send(204);
  } catch (error) {
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  const { error } = validateClient(req.body);
  let { id } = req.params;
  try {
    if (error) throw new ApiError(400, { message: error.details[0].message });

    const client = await Client.findById(id).populate('user');
    if (!client) throw new ApiError(404, { message: 'Client not Found.' });

    const updatedCLient = await Client.findOneAndUpdate(
      { user: id },
      req.body,
      { new: true }
    );
    res.send(updatedCLient);
  } catch (error) {
    next(error);
  }
};
