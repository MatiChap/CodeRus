
const express = require('express');
const routerUsers = express.Router();
const userControl = require ('./../controllers/controllerUsers');
const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
const user = require('../../database/models/user');
let validation = [
   body("username").notEmpty().withMessage('Please insert your username.').bail()
   .isLength({min:5}).withMessage('Username is too short.'),
   body("email").notEmpty().withMessage('Please insert your email.').bail()
   .isEmail().withMessage('Invalid email') ,
   body("password").notEmpty().withMessage('Please enter your password.').bail()
   .isLength({min:5}).withMessage('Your password is too short!(Min characters:5)')
   .isLength({max:20}).withMessage('Your password is too long! (Max characters:20)'),
   body("age").notEmpty().withMessage('Please insert your age.').bail(),
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
    body("email").notEmpty().withMessage('Please insert your email.').bail()
    .isEmail().withMessage('Invalid email') ,
    body("password").notEmpty().withMessage('Please insert your password.').bail()
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


//---------------------------PROJECT COMMENT&RATE FORM--------------------------------
routerUsers.get('/endConnection/:id', userControl.endConnect);


//----------------PROJECT RATE&COMMENT FUNCTION------------------------------------
routerUsers.put('/endConnection/:id',[
   body("comment").notEmpty().withMessage('Please leave a comment describing your experience.').bail()
], userControl.endedConnect);



module.exports = routerUsers;