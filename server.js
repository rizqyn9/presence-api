const express = require('express');
const bodyParser = require("body-parser");
const app = express();

var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var routes = require('./routes');
routes(app);

app.use('/auth', require('./middleware'));
app.use('/uploads', express.static('uploads'));

app.listen(4500, () =>{
    console.log('server started on port');
});