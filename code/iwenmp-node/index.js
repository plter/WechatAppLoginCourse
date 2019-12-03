var express = require('express');
var bodyParser = require('body-parser');
var mp = require('./routes/mp');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/mp', mp);


app.listen(3000,()=>{
    console.log(3000);
})