// src/middlewares/validate.js
module.exports = (validatorFn) => (req, res, next) => {
  const { error } = validatorFn(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
