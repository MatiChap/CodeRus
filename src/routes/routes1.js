const controller1 = require ('./../controllers/controller1');

const express = require('express');
const router = express.Router();

router.get('/', controller1.index);

router.get('/register', controller1.register);

router.get('/login', controller1.login);

router.get('/dev', controller1.dev);

router.get('/cart', controller1.cart);

module.exports = router;