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



module.exports = {signupValidation, loginValidation, isIdInParamValid,
  isUsernameInQueryValid, isRefreshTokenPresent};