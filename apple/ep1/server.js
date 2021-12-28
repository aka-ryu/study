const express = require('express');
const app = express();

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.get('/pet', function(req ,resp){
    resp.send('펫 응답');
});

app.get('/beauty', function(req,resp){
    resp.send('뷰티용품 쇼핑 페이지임');
});

app.get('/', function(req,resp){
    resp.sendFile(__dirname + '/index.html');
});