const express = require('express');
const app = express();
const path = require('path');
app.use(express.static("public"));

app.listen(8080, function(){
    console.log('열림');
});

app.get('/', function(req, resp){
    resp.render('main.ejs');
});

app.get('/board', function(req, resp){
    resp.render('board.ejs');
});

app.get('/login', function(req, resp){
    resp.render('login.ejs');
});

app.get('/register', function(req, resp){
    resp.render('register.ejs');
})

app.get('detail/id', function(req,resp){
    resp.render('search.ejs')
})