const path = require('path');

const userControl = 
{
register: (req, res) => {
    res.render('register');
},

create: function(req,res){
    let usuario = { name:req.body.username,
        surname:req.body.surname,
        email:req.body.email,
        password:req.body.password,
        legalage:req.body.legalage

    }
    res.redirect('/')
    console.log(usuario)

},

login: (req, res) => {
    res.render('login');
}
};

module.exports = userControl;
