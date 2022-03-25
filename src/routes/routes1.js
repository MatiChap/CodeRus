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
const {body} = require('express-validator');
let validation = [
   body("name").notEmpty().withMessage('Please insert your full name in the form.').bail()
   .isLength({min:5}).withMessage('Reminder: Do not use nicknames or abreviations.')
   .matches(/^[A-Za-z\s]+$/).withMessage('Reminder: Do not include numbers or other characters in your name.'),
   body("price").notEmpty().withMessage('Please insert your desired price in the form.').bail()
   .isNumeric().withMessage('Reminder: Price should be expressed in numbers only.') ,
   body("desc").notEmpty().withMessage('Please enter your description in the form.').bail()
   .isLength({min:15}).withMessage('Your description is too short!(Min characters:15)')
   .isLength({max:100}).withMessage('Your description is too long! (Max characters:100)')

]

router.get('/', controller1.index);

router.get('/dev', controller1.dev);
router.delete('/dev/:id', controller1.deletedev);


router.get('/newDev', controller1.newDevForm);
router.post('/newDev', upload.single("pp"), validation, controller1.newDevCreate);

router.get('/devProfile/:id', controller1.devProfile);


router.get('/cart', controller1.cart);

router.get('/edit/:id',controller1.edit);

router.put('/edit/:id', upload.single("pp"), validation, controller1.edited);

router.get('/logout', controller1.logout)

module.exports = router;