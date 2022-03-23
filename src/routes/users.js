
const express = require('express');
const routerUsers = express.Router();
const userControl = require ('./../controllers/controllerUsers');
const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
let validation = [
   body("username").notEmpty().withMessage('Please insert your username in the form.').bail()
   .isLength({min:5}).withMessage('Username is too short.'),
   body("email").notEmpty().withMessage('Please insert your email in the form.').bail()
   .isEmail().withMessage('Invalid email') ,
   body("password").notEmpty().withMessage('Please enter your password in the form.').bail()
   .isLength({min:5}).withMessage('Your password is too short!(Min characters:5)')
   .isLength({max:20}).withMessage('Your password is too long! (Max characters:20)')

]

routerUsers.get('/register', userControl.register);

routerUsers.post('/register', validation, userControl.create);

routerUsers.get('/login', userControl.login);

routerUsers.post('/login',[
    body("email").notEmpty().withMessage('Please insert your email in the form.').bail()
    .isEmail().withMessage('Invalid email') ,
    body("password").notEmpty().withMessage('Please enter your password in the form.').bail()
    .isLength({min:5}).withMessage('That password is too short!(Min characters:5)')
    .isLength({max:20}).withMessage('That password is too long! (Max characters:20)')
 
 ], userControl.userLogin)

routerUsers.get('/profile', userControl.profile)



module.exports = routerUsers;