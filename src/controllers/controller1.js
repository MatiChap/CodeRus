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
const upload = multer({ storage:storage });
const { validationResult } = require('express-validator');
const dataFilePath = path.join(__dirname, '../database/Data.json');
const devs = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

const controlador = {
index: (req, res) => {	
        res.render('home');
},

dev: (req, res) => {
    
    res.render('dev',{data: devs});
},
newDevForm: (req,res) => {
        
        res.render('newDev')
        
},
newDevCreate: (req,res) => {
        
        let errors = validationResult(req);
        if(errors.isEmpty()){
                let id = devs[devs.length-1].id +1;
       
        let {name, desc, pp, price} = req.body
        pp ='/img/pp/' + req.file.filename;
        let newDev = {name, desc, pp, price, id};

        
        
        

        devs.push(newDev);
       
       fs.writeFileSync(dataFilePath, JSON.stringify(devs,null,' '));
       res.redirect('/dev') ;

        }else{
                res.render('newDev', {errors: errors.array(), old: req.body})
        }

        
       console.log(errors);
       console.log(devs);
       
       
      
       
        

},
deletedev: function(req,res){
           let list = devs.filter((dev) => dev.id != req.params.id);
           fs.writeFileSync(dataFilePath, JSON.stringify(list,null,' '));
           res.render('dev',{data:list});
        
        
},
devProfile : (req,res)=> {
        let profile=null;
for(let d of devs){
        if( d.id == req.params.id){
                profile=d;
                break;

        }
}
res.render('devProfile', {data: profile});
},
edit: (req,res) => {
        
        let idDev=req.params.id;
        

        let devEdit = devs[idDev];

        res.render('edit', {userToEdit: devEdit})
           
},

edited:function (req,res) {
        let errors=validationResult(req);
        let idDev=req.params.id;
        let devEdit = devs[idDev];
        if(errors.isEmpty()){
         console.log(req.body)
        let {name, desc, pp, price} = req.body
        pp ='/img/pp/' + req.file.filename;
        let devEdited = {name, desc, pp, price};
        for(let i=0;i<devs.length;i++){
             if(devs[i].id == req.params.id){
                devs[i] = {...devs[i], ...devEdited};
                console.log(devs[i]);
                 break;
                 
             }
         }
         fs.writeFileSync(dataFilePath, JSON.stringify(devs,null,' '));
         res.redirect('/');       
        }else{
                
                res.render('edit', {errors: errors.array(), old: req.body, userToEdit: devEdit})     
        }
        
        },

        



cart: (req, res) => {
    
    res.render('cart',{data:devs});

}
}

module.exports = controlador;