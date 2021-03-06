const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '..', './public');
const router = require('./routes/routes1');
app.use( express.static (publicPath));
const routerUsers = require('./routes/users');
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
const session = require('express-session');
app.use(session({secret:'coderus is secret'}));
const bcrypt = require('bcryptjs');
const cors = require('cors');

app.use(cors());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/', router);
app.use('/user', routerUsers);

app.use('*', function(req,res) {
    res.send("Error 404");
});

app.listen(process.env.PORT || 4000, () =>
console.log('Server up')
);



