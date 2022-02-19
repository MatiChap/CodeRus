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



app.use('/', router);
app.use('/user', routerUsers);

app.use('*', function(req,res) {
    res.send("Error 404");
});

app.listen(process.env.PORT || 3000, () =>
console.log('Server up')
);

app.set('view engine','ejs');

app.set('views', path.join(__dirname, '/views'))