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
   .isLength({min:4}).withMessage('Reminder: Do not use nicknames or abreviations.')
   .matches(/^[A-Za-z\s]+$/).withMessage('Reminder: Do not include numbers or other characters in your name.'),
   body("description").notEmpty().withMessage('Please enter your description in the form.').bail()
   .isLength({min:15}).withMessage('Your description is too short!(Min characters:15)')
   .isLength({max:100}).withMessage('Your description is too long! (Max characters:100)')
]
//-------------------------HOME ROUTE----------------------
router.get('/', controller1.index);

//-------------------------DEV LIST----------------------
router.get('/dev', controller1.dev);

//-------------------------DEV DELETE----------------------
router.delete('/dev/:id', controller1.deletedev);

//-------------------------DEV REGISTER FORM----------------------
router.get('/newDev', controller1.newDevForm);

//-------------------------DEV REGISTER FUNCTION----------------------
router.post('/newDev', upload.single("picture"), validation, controller1.newDevCreate);

//-------------------------DEVELOPER PROFILE----------------------
router.get('/devProfile/:id', controller1.devProfile);

//-------------------------CART----------------------
router.get('/cart', controller1.cart);
router.post('/cart', controller1.hire);

//-------------------------EDIT DEV FORM----------------------
router.get('/edit/:id',controller1.edit);

//-------------------------EDIT DEV FUNCTION----------------------
router.put('/edit/:id', upload.single("picture"), [body("name").notEmpty().withMessage('Please insert your full name in the form.').bail()
.isLength({min:5}).withMessage('Reminder: Do not use nicknames or abreviations.')
.matches(/^[A-Za-z\s]+$/).withMessage('Reminder: Do not include numbers or other characters in your name.'),
body("description").notEmpty().withMessage('Please enter your description in the form.').bail()
.isLength({min:15}).withMessage('Your description is too short!(Min characters:15)')
.isLength({max:100}).withMessage('Your description is too long! (Max characters:100)'),], controller1.edited);

//-------------------------LOGOUT----------------------
router.get('/logout', controller1.logout)

router.get('/search', controller1.search);

//------------------------------API-----------------------------

router.get('/usersapi',controller1.returnUsers);

router.get('/usersapi/:id', controller1.returnUser);

router.get('/devsapi', controller1.returnDevs);

router.get('/devsapi/:id',controller1.returnDev);

router.get('/projectapi', controller1.returnProject);


module.exports = router;