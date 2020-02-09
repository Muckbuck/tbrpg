const express = require('express')
const app = express()
const index = require('../src/routes/index.ts')

// View engine
app.set('views', './views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Static files
app.use(express.static('public'));

// Routes
app.get('/', index);


app.listen(3000)