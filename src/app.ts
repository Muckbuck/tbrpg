const express = require('express')
const router = express.Router();
const app = express()
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const sass = require('sass');
const hbs = require( 'express-handlebars');

const home = require('../src/routes/home.ts')

const port = 3000;
http.listen(port, () => {
    console.log(`Listening on port: ${port}` )
});

// Static files
const static_path = path.join(__dirname, '/public/');
app.use(express.static(static_path));

/* var result = sass.renderSync({
    file: __dirname + '/../public/sass/main.scss',
    outFile: __dirname + '/../public/css/main.css',
    sourceMap: true
  })
*/


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

//  Routing
app.get('/', home);