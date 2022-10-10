//validation
const Joi = require("joi");

// register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    phoneNumber: Joi.string()
      .min(10)
      .max(15)
      .pattern(/^[0-9]+$/)
      .required(),
    userName: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(data);
};

//PETANI Register Validation
const petaniRegisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(0).max(255),
    password: Joi.string().min(8).max(1024).required(),
    phoneNumber: Joi.string()
      .min(10)
      .max(15)
      .pattern(/^[0-9]+$/)
      .required(),
    userName: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.petaniRegisterValidation = petaniRegisterValidation;
