const Joi = require('joi');

exports.validateUser = (user) => {
  const schema = {
    nameAr: Joi.string().not().empty().min(5).max(50).required(),
    nameEn: Joi.string().not().empty().min(5).max(50).required(),
    email: Joi.string()
      .not()
      .empty()
      .min(5)
      .max(50)
      .required()
      .lowercase()
      .email(),
    password: Joi.string().not().empty().min(5).max(50).required(),
  };
  return Joi.validate(user, schema);
};

exports.validateLogin = (user) => {
  const schema = {
    email: Joi.string()
      .not()
      .empty()
      .min(5)
      .max(50)
      .required()
      .lowercase()
      .email(),
    password: Joi.string().not().empty().min(5).max(50).required(),
  };
  return Joi.validate(user, schema);
};
