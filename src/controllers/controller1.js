const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({ 
        destination: function (req, file, cb) { 
           cb(null, './public/img/pp'); 
        }, 
        filename: function (req, file, cb) { 
           cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
      });

      const fileFilter = (req, file, cb) => {
        if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
            cb(null, true);
        } else {
           // cb(new multer.MulterError('not a PNG'), false);
            //cb(null,false);
            return cb(new Error('No es una imagen'));
        }
    };
    
    
    const limits = {
        fileSize: 1024 * 1024 * 2, // tamaño en bytes, 2 mb 
        fieldNameSize: 200
    }
const upload = multer({ storage:storage, fileFilter: fileFilter, limits: limits });
const { validationResult } = require('express-validator');
const dataFilePath = path.join(__dirname, '../database/Data.json');
// let devs = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
const sharp=require('sharp');

let db = require('../../database/models')


const controlador = {

//-------------------------HOME----------------------
index: (req, res) => {	
        
        res.render('home', {user:req.session.loggedUser}); 
},

//------------------------DEVELOPER LIST----------------------
dev: (req, res) => {
        db.Devs.findAll()
                .then(function(dev){
                  res.render('dev',{data: dev,user:req.session.loggedUser});      
                })

        
    
},

//-------------------------DEV REGISTER FORM----------------------
newDevForm: (req,res) => {
        
        
        res.render('newDev', {user:req.session.loggedUser})
        
},

//-------------------------DEV REGISTER SUCCESS----------------------
newDevCreate: (req,res) => {
        
        let errors = validationResult(req);
        if(errors.isEmpty() && req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/png'){
                db.Devs.create({
                        name: req.body.name,
                        nationality: req.body.nationality,
                        picture: '/img/pp/'+ req.file.filename,
                        age: req.body.age,
                        description: req.body.description
                })


                db.Devs.findAll()
                .then(function(dev){
                  res.render('dev',{data: dev,user:req.session.loggedUser});      
                })
        

        
       
       


       
       

        }else{
                res.render('newDev', {errors: errors.array(), old: req.body, user:req.session.loggedUser})
        }

        
       
       
       
      
       
        

},


//-------------------------DEV DELETE----------------------
deletedev: function(req,res){
        db.Devs.findByPk(req.params.id)
                .then(function(dev){
                        fs.unlinkSync(path.join(__dirname, '../../public', dev.picture))
                });
        db.Devs.destroy({
                where: {
                        id: req.params.id
                }
        })

        db.Devs.findAll()
                .then(function(dev){
                  res.render('dev',{data: dev,user:req.session.loggedUser});      
                })

           
        

        

}, 



//-------------------------DEVELOPER PROFILE----------------------
devProfile : (req,res)=> {
        db.Devs.findByPk(req.params.id)
        .then(function(dev){
                res.render('devProfile', {data: dev, user: req.session.loggedUser} )
                console.log(dev.picture)
        })
},


//-------------------------EDIT DEV FORM----------------------
edit: (req,res) => {
        db.Devs.findByPk(req.params.id)
    .then(function(dev){
            res.render('edit', {user:req.session.loggedUser, dev: dev})
    })

       
           
},


//-------------------------EDIT DEV SUCCESS----------------------   
edited:function (req,res) {
        let errors=validationResult(req);
        if(errors.isEmpty()){

        
   
                
                db.Devs.update({
                        name: req.body.name,
                        description: req.body.description,
                        picture: '/img/pp/' + req.file.filename
                    },
                    {
                        where:{
                            id: req.params.id
                        }
                    })
        
        
                    db.Devs.findAll()
                    .then(function(dev){
                      res.render('dev',{data: dev,user:req.session.loggedUser});      
                    })
           
        }else{
                db.Devs.findByPk(req.params.id)
    .then(function(dev){
        res.render('edit', {errors: errors.array(), old: req.body, dev: dev, user:req.session.loggedUser}) 
            
                
                  
        })
}
        
        },

        
//-------------------------CART(IN PROGRESS)----------------------
cart: (req, res) => {
    
    res.render('cart',{data:devs, user:req.session.loggedUser});

},


//-------------------------LOGOUT----------------------
logout: (req,res) => {
        delete req.session.loggedUser;
        res.redirect('/')
}
}

module.exports = controlador;