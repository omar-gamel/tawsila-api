const Joi = require('joi');

exports.validateSetting = (setting) => {
  const schema = {
    kmPrice: Joi.number().not().empty().required(),
    deliveryType: Joi.string().not().empty().required(),
    recieveUpdates: Joi.boolean().optional(),
  };
  return Joi.validate(setting, schema);
};
