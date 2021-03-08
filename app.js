const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const databaseURL='mongodb://localhost:27017/blog-app';
var routes = require('./routes/index');


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/api',routes);

mongoose.connect(databaseURL,{useNewUrlParser:true, useUnifiedTopology: true},function(){}).then(()=>{
    console.log("Connected to Database");
}).catch(err=>{
    console.error("not connected");
    process.exit(1);
});

app.listen(port,()=>{
    console.log('Server is runnning', +port);
})