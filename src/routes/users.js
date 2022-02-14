
const express = require('express');
const routerUsers = express.Router();
const userControl = require ('./../controllers/controllerUsers');

routerUsers.get('/register', userControl.register);

routerUsers.post('/register',userControl.create);

routerUsers.get('/login', userControl.login);





module.exports = routerUsers;