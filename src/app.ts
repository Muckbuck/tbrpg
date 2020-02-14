const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const sass = require('sass');
const hbs = require( 'express-handlebars');
const sassMw = require('node-sass-middleware');


// Require routes
const home = require('../src/routes/home.ts')

// Set server to listen at given port
const port = 3000;
http.listen(port, () => {
    console.log(`Listening on port: ${port}` )
});

app.use(sassMw({
    /* Options */
    src: path.join(__dirname, '/../src/public/sass'),
    dest: path.join(__dirname, '/../src/public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// Static files (Has to be declared after Sass)
const static_path = path.join(__dirname, '/public/');
app.use(express.static(static_path));

// View engine
app.set('views', __dirname + '/../views/pages');
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/../views/pages/',
    partialsDir: __dirname + '/../views/partials/'
}));

// Listen for connection event
io.on('connection', function (socket: any) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data: any) {
        console.log(data);
    });
});

//  Routing
app.get('/', home);