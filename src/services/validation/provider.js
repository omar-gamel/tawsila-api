const Joi = require('joi');

exports.validateProvider = (provider) => {
  const schema = {
    transferFees: Joi.optional().not().empty(),
    gender: Joi.string().not().empty(),
    busy: Joi.optional().not().empty(),
  };
  return Joi.validate(provider, schema);
};
