
const express = require('express');
const routerUsers = express.Router();
const userControl = require ('./../controllers/controllerUsers');
const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
let validation = [
   body("username").notEmpty().withMessage('Please insert your username.').bail()
   .isLength({min:5}).withMessage('Username is too short.'),
   body("email").notEmpty().withMessage('Please insert your email.').bail()
   .isEmail().withMessage('Invalid email') ,
   body("password").notEmpty().withMessage('Please enter your password.').bail()
   .isLength({min:5}).withMessage('Your password is too short!(Min characters:5)')
   .isLength({max:20}).withMessage('Your password is too long! (Max characters:20)'),
   body("age").notEmpty().withMessage('Please insert your age.').bail()
   .isLength({min:2,max:2}).withMessage('Invalid age.').bail()
   .isInt({min:18}).withMessage('You must be at least 18 years old to use our platform.'),
   body("nationality").notEmpty().withMessage('Please insert your nationality.').bail()
   .isAlpha().withMessage('Invalid character in nationality.'),
   body("phone").notEmpty().withMessage("Insert your phone number.").bail()
   .isNumeric().withMessage('Invalid character in phone number')

   

]

//-------------------------USER REGISTER FORM----------------------
routerUsers.get('/register', userControl.register);


//-------------------------USER REGISTER FUNCTION----------------------
routerUsers.post('/register', validation, userControl.create);


//-------------------------USER LOGIN FORM----------------------
routerUsers.get('/login', userControl.login);


//-------------------------USER LOGIN FUNCTION----------------------
routerUsers.post('/login',[
    body("email").notEmpty().withMessage('Please insert your email in the form.').bail()
    .isEmail().withMessage('Invalid email') ,
    body("password").notEmpty().withMessage('Please enter your password in the form.').bail()
    .isLength({min:5}).withMessage('That password is too short!(Min characters:5)')
    .isLength({max:20}).withMessage('That password is too long! (Max characters:20)')
 
 ], userControl.userLogin);


//-------------------------USER PROFILE----------------------
routerUsers.get('/profile', userControl.profile);


//-------------------------USER EDIT PROFILE FORM----------------------
routerUsers.get('/editProfile/:id', userControl.editProfile);


//-------------------------USER EDIT PROFILE FUNCTION----------------------
routerUsers.put('/editProfile/:id',[
   body("email").notEmpty().withMessage('Please insert your email in the form.').bail()
   .isEmail().withMessage('Invalid email') ,
   body("password").notEmpty().withMessage('Please enter your password in the form.').bail()
   .isLength({min:5}).withMessage('That password is too short!(Min characters:5)')
   .isLength({max:20}).withMessage('That password is too long! (Max characters:20)')

], userControl.editedProfile);




module.exports = routerUsers;