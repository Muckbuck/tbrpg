namespace Server{
    
    const express = require('express')
    const app = express()
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    const path = require('path');
    const hbs = require( 'express-handlebars');
    const sassMw = require('node-sass-middleware');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    
    // Require routes
    const home = require('./routes/home.ts');
    const map = require('./routes/map');
    const registerAccount = require('./routes/registerAccount');

    app.use(express.json());
    //  Routing
    app.get('/', home);
    app.get('/map', map);
    app.post('/registeraccount', registerAccount)
    
   
    // Set server to listen at given port
    const port = 3001;
    http.listen(port, () => {
        console.log(`Listening on port: ${port}` )
    });
    
    // Connect to db
    mongoose.connect('mongodb://localhost:27017/tbprg', {useNewUrlParser: true, useUnifiedTopology: true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    // we're connected!
        console.dir('Connected to db');
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
}