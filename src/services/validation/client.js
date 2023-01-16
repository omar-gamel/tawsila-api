const Joi = require('joi');

exports.validateClient = (client) => {
  const schema = {
    location: Joi.string().not().empty().min(5).max(50).required(),
  };
  return Joi.validate(client, schema);
};
