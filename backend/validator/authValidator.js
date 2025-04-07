const {body, param, query, cookie} = require("express-validator");


const signupValidation = [
    body('email', 'Email is Invalid').trim().escape().isEmail().normalizeEmail({ gmail_remove_dots: false, gmail_remove_subaddress: false }),
    body("password", "Password is Invalid").trim().escape().isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      "Password is Not Strong Enough. (At least 8 characters, including one lowercase, one uppercase, one number, and one symbol)"
    ),
    body("confirmPassword", "Passwords Do not Match!").trim().custom((value, { req }) => {return value === req.body.password;})
];

const loginValidation = [
    body('emailOrUsername', 'Email or Username is Required').trim().notEmpty().toLowerCase().escape(),
    body('password', 'Password is Required').trim().notEmpty()
];

const isIdInParamValid =[
  param('id').isMongoId().withMessage('Invalid Id')
];


const isUsernameInQueryValid = [
  query('username').optional().isString().trim().notEmpty().withMessage('Username cannot be empty if provided'),
];

const isRefreshTokenPresent = [
  cookie('refreshToken').exists().withMessage('Refresh token is missing').notEmpty().withMessage('Refresh token cannot be empty'),
];


const updateUserValidator = [
  param('id').isMongoId().withMessage('Invalid Id'),

  body('username')
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .optional()
    .trim().escape().isEmail().normalizeEmail({ gmail_remove_dots: false, gmail_remove_subaddress: false }),
  body('lastLogin')
    .optional()
    .isISO8601()
    .toDate(),

  body('userDetails.fullName')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Full name must be at most 100 characters'),
  body('userDetails.phone')
    .optional()
    .isMobilePhone()
    .withMessage('Phone must be valid'),
  body('userDetails.address')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Address must be at most 200 characters'),

  body('password').not().exists().withMessage('Password cannot be updated here'),
  body('refreshToken').not().exists(),
  body('refreshTokenExpiry').not().exists(),
  body('emailVerificationToken').not().exists(),
  body('emailVerificationTokenExpiry').not().exists(),
  body('passwordResetToken').not().exists(),
  body('passwordResetTokenExpiry').not().exists(),
  body('roles').not().exists(),
  body('isBanned').not().exists(),
  body('isVerified').not().exists(),
  body('createdBy').not().exists()
];




module.exports = {signupValidation, loginValidation, isIdInParamValid,
  isUsernameInQueryValid, isRefreshTokenPresent, updateUserValidator};