const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '..', './public');
const router = require('./routes/routes1');
app.use( express.static (publicPath));

app.use('/', router);

app.use('*', function(req,res) {
    res.send("Error 404");
});


app.listen(process.env.PORT || 3000, () =>
console.log('Levantando un servidor con Express')
);

app.set('views','/views');

