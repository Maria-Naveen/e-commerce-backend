const validateData = (validationSchema) => (req, res, next) => {
  const { error } = validationSchema.validate(req.body, { abortEarly: false });
  if (error)
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join("; "),
    });
  next();
};

module.exports = validateData;
