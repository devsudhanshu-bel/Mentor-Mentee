import Joi from "joi";

// ==========================================================
// LOGIN VALIDATION
// ==========================================================
//
// Frontend:
//
// {
//   identifier: "admin@gmail.com",
//   password: "Password@123"
// }
//
// Email is the authentication identifier.
// ==========================================================

const loginSchema = Joi.object({
  identifier: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",

    "string.email": "Please provide a valid email address",

    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",

    "any.required": "Password is required",
  }),
});

// ==========================================================
// LOGIN VALIDATOR
// ==========================================================

export const validateLogin = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,

    stripUnknown: true,
  });

  // ========================================================
  // VALIDATION ERROR
  // ========================================================

  if (error) {
    return res.status(400).json({
      success: false,

      message: "Validation failed.",

      errors: error.details.map((detail) => detail.message),
    });
  }

  // ========================================================
  // USE VALIDATED BODY
  // ========================================================

  req.body = value;

  next();
};
