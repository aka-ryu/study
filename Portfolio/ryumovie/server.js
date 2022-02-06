const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')))

const http = require('http').createServer(app);

http.listen(8080, function() {
    console.log('listen 8080')
});

app.get('/', function(req, resp){
    resp.sendFile(path.join(__dirname, '/public/index.html'))
})
