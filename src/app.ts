const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const index = require('../src/routes/index.ts')

http.listen(3000)

// View engine
app.set('views', __dirname + '/../views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

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


