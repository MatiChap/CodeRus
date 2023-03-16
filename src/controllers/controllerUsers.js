const path = require('path');
const fs = require('fs');
const dataFilePath = path.join(__dirname, '../database/userData.json');
//let users = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));//
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');



let db = require('../../database/models')

const userControl = 
{
        //-------------------------USER REGISTER FORM---------------------
register: (req, res) => {
    res.render('register');
},
    //-------------------------USER REGISTER FUNCTION----------------------
create: function(req,res){
    let errors = validationResult(req);
    db.Users.findAll({
        where: {
            username: req.body.username
        }
    }).then(function(acc){
        if(acc.length > 0){
            console.log(acc)
            res.render('register', {errors: [{msg:"That username is already taken!"}], old: req.body})
        }else{
            db.Users.findAll({
                where: {
                    email: req.body.email
                }
            }).then(function(mail){
                if(mail.length > 0){
                    res.render('register', {errors: [{msg:"That email already belongs to another account!"}], old: req.body})
                }else{
        
        if(errors.isEmpty()){
       
        
        psswrd = req.body.password;
        password = bcrypt.hashSync(psswrd , 10);

        db.Users.create({
            username: req.body.username,
            pass: password,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            nationality: req.body.nationality
        })
        
        
       res.redirect('/') ;
       

        }else{
                res.render('register', {errors: errors.array(), old: req.body})
        }    
        }
    })
    
        

}
})},
        //-------------------------LOG IN FORM----------------------
login: (req, res) => {
    
    if(req.query.error){
        error = [{msg: "You must log in first!"}]
        console.log(error)
        res.render('login',{errors:error});
    }else{
        res.render('login');
    }
    
},
        //-------------------------LOG IN FUNCTION----------------------
userLogin: (req,res)=> {
    let errors = validationResult(req);
    req.session.errors = []
        if(errors.isEmpty()){
            let loggingUser;
            db.Users.findAll()
                .then(function(user){
                    for(let i=0 ; i < user.length; i++){
                if(user[i].email == req.body.email){
                    console.log("mail OK")
                    console.log(user[i])
                    if(bcrypt.compareSync(req.body.password, user[i].pass)){
                        console.log("pass OK")
                        loggingUser = user[i];
                    }
                }
            }
            if(loggingUser == undefined){
                res.render('login', {errors: [
                    {msg: "Invalid email or password."}
                ], old: req.body})

            }
            req.session.loggedUser = loggingUser;
            res.redirect('/')
        })
            

}else{
    res.render('login', {errors: errors.array(), old: req.body})
}
},
        //-------------------------USER PROFILE----------------------
profile:async(req,res)=> {
    db.Projects.findAll({
        raw:true,
        nest:true,
        include: [{
            model:db.Devs,
            as: 'devs',
            raw:true,
            nest:true
            
    }],
        where :{
            user_id: req.session.loggedUser.id,
            ongoing:1
        }
        
    }).then(function(data){
       
       console.log(data);
        res.render('userprofile', {user:req.session.loggedUser, data: data})
    })
            
},
        //-------------------------EDIT PROFILE FORM----------------------
editProfile: (req,res) => {
    db.Users.findByPk(req.params.id)
    .then(function(user){
            res.render('editprofile', {user:req.session.loggedUser, userToEdit: user})
    })

    
},
        //-------------------------EDIT PROFILE FUNCTIION----------------------
editedProfile: (req,res)=> {
    let errors = validationResult(req);
        if(errors.isEmpty()){
            password = bcrypt.hashSync(req.body.password , 10);
            db.Users.update({
                email: req.body.email,
                password: password,
                phone: req.body.phone
            },
            {
                where:{
                    id: req.params.id
                }
            })

        delete req.session.loggedUser;
       res.redirect('/') ;
       

        }else{
                res.render('editProfile', {errors: errors.array(), old: req.body, user:req.session.loggedUser})
        }
},

//----------------------------------- COMMENT&RATE FORM ---------------------------------
  endConnect:  (req,res)=> {

      if(req.params.id < 9999 && req.params.id > 0 ){db.Projects.findOne({
        raw:true,
        nest:true,
        where: {
            id:req.params.id
        },
        
        include: [{
            model:db.Devs,
            as: 'devs',
            raw:true,
            nest:true
            
    }]
        
        
    }).then(function(data){
       console.log('params = ' + req.params.id)
       console.log(data);
        res.render('projectend', {user:req.session.loggedUser, data: data})
    })
}
  },
  
  //-----------------------------COMMENT&RATE FUNCTION-----------------------------------
  endedConnect: (req,res) => {
    let errors = validationResult(req);
      if(errors.isEmpty()){
          db.Projects.update({
              success: req.body.success,
              ongoing: '0',
              devComment : req.body.comment,
              devRating: req.body.rating
          },
          {
              where:{
                  
                  id: req.params.id

          }
        })
        res.redirect('/')
      }else{
          res.render('projectend',{data:data, user:req.session.loggedUser, errors: errors.array()})
      }
  }
};

module.exports = userControl;
