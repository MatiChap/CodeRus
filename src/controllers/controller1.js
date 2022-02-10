const path = require('path');

const controlador = 
{
    index: (req, res) => {	
        res.render(path.resolve(__dirname, '..', './views/home.ejs'));
},

register: (req, res) => {
    res.render(path.resolve(__dirname, '..', './views/register.ejs'));
},

login: (req, res) => {
    res.render(path.resolve(__dirname, '..', './views/login.ejs'));
},
dev: (req, res) => {
    res.render(path.resolve(__dirname, '..', './views/dev.ejs'));
},
cart: (req, res) => {
    res.render(path.resolve(__dirname, '..', './views/cart.ejs'));

}
}

module.exports = controlador;