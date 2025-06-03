// src/validators/index.js
const Joi = require('joi');

// Validation pour une chanson
const validateSong = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.number().min(0).optional()
  });
  return schema.validate(data, { abortEarly: false });
};

// Validation pour un utilisateur
const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data, { abortEarly: false });
};

// Validation pour une playlist
const validatePlaylist = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    songs: Joi.array().items(Joi.string().hex().length(24)).optional()
  });
  return schema.validate(data, { abortEarly: false });
};

// Validation pour un abonnement Stripe
const validateSubscription = (data) => {
  const schema = Joi.object({
    planId: Joi.string().required(),
    paymentMethodId: Joi.string().required()
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateSong,
  validateUser,
  validatePlaylist,
  validateSubscription
};
