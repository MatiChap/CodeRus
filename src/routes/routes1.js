const controller1 = require ('./../controllers/controller1');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const path = require('path');
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/pp'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  });

const upload = multer({ storage:storage });

router.get('/', controller1.index);

router.get('/dev', controller1.dev);
router.delete('/dev/:id', controller1.deletedev);


router.get('/newDev', controller1.newDevForm);
router.post('/newDev', upload.single("pp"), controller1.newDevCreate);

router.get('/devProfile/:id', controller1.devProfile);


router.get('/cart', controller1.cart);

router.get('/edit/:id',controller1.edit);

router.put('/edit/:id', upload.single("pp"), controller1.edited);

module.exports = router;