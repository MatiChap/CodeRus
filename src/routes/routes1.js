const controller1 = require ('./../controllers/controller1');

const express = require('express');
const router = express.Router();

router.get('/', controller1.index);

router.get('/dev', controller1.dev);
router.delete('/dev/:id', controller1.deletedev);

router.get('/cart', controller1.cart);

router.get('/edit/:id',controller1.edit);

router.put('/edit/:id', controller1.edited);

module.exports = router;