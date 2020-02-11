const express = require('express')
const router = express.Router();
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const index = require('../src/routes/index.ts')
const hbs = require( 'express-handlebars');

http.listen(3000)

// View engine
app.set('views', '../views/pages');
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/../views/pages/',
    partialsDir: __dirname + '/../views/partials/'
}));

io.on('connection', function (socket: any) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data: any) {
        console.log(data);
    });
});

// Static files
app.use(express.static('public'));

// Actual routing
app.get('/', index);

app.get('/home', function(req:any, res:any, next:any) {
    res.render('home', {layout: 'home', template: 'home-template'});
  });


