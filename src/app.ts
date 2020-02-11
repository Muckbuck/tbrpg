const express = require('express')
const router = express.Router();
const app = express()
const index = require('../src/routes/index.ts')
const hbs = require( 'express-handlebars');

// View engine
app.set('views', '../views/pages');
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/../views/pages/',
    partialsDir: __dirname + '/../views/partials/'
}));

// Static files
app.use(express.static('public'));

// Routes
app.get('/', index);

app.get('/home', function(req:any, res:any, next:any) {
    res.render('home', {layout: 'home', template: 'home-template'});
  });


app.listen(3000)