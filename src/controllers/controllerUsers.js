const path = require('path');
const fs = require('fs');
const dataFilePath = path.join(__dirname, '../database/userData.json');
let users = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');





const userControl = 
{
register: (req, res) => {
    res.render('register');
},

create: function(req,res){
    let errors = validationResult(req);
        if(errors.isEmpty()){
       
        let {username, email} = req.body;
        psswrd = req.body.password;
        password = bcrypt.hashSync(psswrd , 10);
        
        let newUser = {username, password, email};

        
        console.log(newUser);
        

        users.push(newUser);
       
       fs.writeFileSync(dataFilePath, JSON.stringify(users,null,' '));
       res.redirect('/') ;
       

        }else{
                res.render('register', {errors: errors.array(), old: req.body})
        }

},

login: (req, res) => {
    res.render('login');
},
userLogin: (req,res)=> {
    let users = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    let errors = validationResult(req);
    let { email, password } =  req.body;
    let loggingUser = { email, password };
        if(errors.isEmpty()){
            let user;
            for(let i=0 ; i < users.length; i++){
                if(users[i].email == loggingUser.email){
                    console.log("mail OK")
                    if(bcrypt.compareSync(loggingUser.password, users[i].password)){
                        console.log("pass OK")
                        user = users[i];
                    }
                }
            }
            if(user == undefined){
                res.render('login', {errors: [
                    {msg: "Invalid email or password."}
                ], old: req.body})

            }
            req.session.loggedUser = user;
            console.log(req.session.loggedUser)
            res.redirect('/')

}else{
    res.render('login', {errors: errors.array(), old: req.body})
}
},
profile: (req,res)=> {
    res.render('userprofile', {user:req.session.loggedUser})
},
editProfile: (req,res) => {
    res.render('editprofile', {user:req.session.loggedUser})
},
editedProfile: (req,res)=> {
    let errors = validationResult(req);
        if(errors.isEmpty()){
       
        let email = req.body.email;
        psswrd = req.body.password;
        password = bcrypt.hashSync(psswrd , 10);
        
        let editedUser = {password, email};
        for(let i=0;i<users.length;i++){
            if(users[i].email == req.session.loggedUser.email){
               users[i] = {...users[i], ...editedUser};
               console.log(users[i]);
                break;
                
            }
        }
        
       
       fs.writeFileSync(dataFilePath, JSON.stringify(users,null,' '));
       
       
        delete req.session.loggedUser;
       res.redirect('/') ;
       

        }else{
                res.render('editProfile', {errors: errors.array(), old: req.body, user:req.session.loggedUser})
        }
}
};

module.exports = userControl;
