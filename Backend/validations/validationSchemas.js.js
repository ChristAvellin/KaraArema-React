const Joi = require('joi');

const validateSong = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.number().min(0).optional(),
  });
  return schema.validate(data);
};

const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { validateSong, validateUser };  