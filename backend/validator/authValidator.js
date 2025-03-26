const {body} = require("express-validator");


const signupValidation = [
    body('email', 'Email is Invalid').trim().escape().isEmail().normalizeEmail(),
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
]

const loginValidation = [
    body('emailOrUsername', 'Email or Username is Required').trim().notEmpty().toLowerCase().escape(),
    body('password', 'Password is Required').trim().notEmpty()
]



module.exports = {signupValidation, loginValidation};