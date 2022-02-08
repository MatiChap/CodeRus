const path = require('path');

const controlador = 
{
    index: (req, res) => {	
        res.sendFile(path.resolve(__dirname, '..', './views/home.html'));
},

register: (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', './views/register.html'));
},

login: (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', './views/login.html'));
},
dev: (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', './views/dev.html'));
},
cart: (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', './views/cart.html'));

}
}

module.exports = controlador;