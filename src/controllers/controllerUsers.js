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
   /* // db.Users.findAll()
    .then(function(user){
        for(let i=0 ; i < user.length; i++){
    if(user[i].email == req.body.email){
        errors = ['Mail already in use.']
        res.render('register', {errors: errors})
    }
}
}); */ 
    let errors = validationResult(req);
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

},
        //-------------------------LOG IN FORM----------------------
login: (req, res) => {
    res.render('login');
},
        //-------------------------LOG IN FUNCTION----------------------
userLogin: (req,res)=> {
    let errors = validationResult(req);
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
profile: (req,res)=> {
    res.render('userprofile', {user:req.session.loggedUser})
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
}
     
};

module.exports = userControl;
