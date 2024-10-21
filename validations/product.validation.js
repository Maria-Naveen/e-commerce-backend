const Joi = require("joi");

const productValidationSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Product ID is required.",
    "string.empty": "Product ID cannot be empty.",
  }),
  title: Joi.string().required().messages({
    "any.required": "Title is required.",
    "string.empty": "Title cannot be empty.",
  }),
  price: Joi.number().required().messages({
    "any.required": "Price is required.",
    "number.base": "Price must be a number.",
    "number.empty": "Price cannot be empty.",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
  category: Joi.string().required().messages({
    "any.required": "Category is required.",
    "string.empty": "Category cannot be empty.",
  }),
  image: Joi.string().required().messages({
    "any.required": "Image URL is required.",
    "string.empty": "Image URL cannot be empty.",
  }),
  rating: Joi.object({
    rate: Joi.number().required().min(0).max(5).messages({
      "any.required": "Rating rate is required.",
      "number.base": "Rating rate must be a number.",
      "number.min": "Rating rate must be at least {#limit}.",
      "number.max": "Rating rate must be at most {#limit}.",
    }),
    count: Joi.number().required().default(0).messages({
      "any.required": "Rating count is required.",
      "number.base": "Rating count must be a number.",
      "number.empty": "Rating count cannot be empty.",
    }),
  })
    .required()
    .messages({
      "any.required": "Rating is required.",
    }),
});

module.exports = productValidationSchema;
