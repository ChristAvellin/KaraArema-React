const User = require('../models/User');

const findUserByEmail = (email) => {
  return User.findOne({ email }).lean();
};

const saveUser = (userData) => {
  return new User(userData).save();
};

module.exports = { findUserByEmail, saveUser };