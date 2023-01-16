const Joi = require('joi');

exports.validateFavorite = (favorite) => {
  const schema = {
    provider: Joi.optional().not().empty().required(),
  };
  return Joi.validate(favorite, schema);
};
