const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

function clothingItemValidation() {
  return Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageURL: Joi.string().required().uri(),
  });
}

function newUserValidation() {
  return Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
}

function userLoginValidation() {
  return Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
}

function clothingItemIdValidation() {
  return Joi.object().keys({
    itemId: Joi.string().required().hex().length(24), // Assuming Mongo ObjectId
  });
}

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  clothingItemIdValidation,
  clothingItemValidation,
  userLoginValidation,
  newUserValidation,
  validateURL,
};
