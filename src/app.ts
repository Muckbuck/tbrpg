const express = require('express')
const router = express.Router();
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sass = require('sass');
const hbs = require( 'express-handlebars');

const index = require('../src/routes/index.ts')

http.listen(3000)

// Static files
app.use('/src/public', express.static('public'));


/* var result = sass.renderSync({
    file: __dirname + '/../public/sass/main.scss',
    outFile: __dirname + '/../public/css/main.css',
    sourceMap: true
  })
  
console.log("HEY")
console.log(result.map.toString()); */


// View engine
app.set('views', __dirname + '/../views/pages');
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



// Actual routing
app.get('/', index);

app.get('/home', function(req:any, res:any, next:any) {
    res.render('home', {layout: 'home', template: 'home-template'});
  });


