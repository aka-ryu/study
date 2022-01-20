const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;
const { all } = require('express/lib/application');
app.set('view engine', 'ejs');



app.get('/pet', function(req, resp){
    resp.send('펫 페이지');
});

app.get('/beauty', function(req, resp){
    resp.send('뷰티 페이지');
});

app.get('/', function(req, resp){
    resp.sendFile(__dirname + '/index.html')
});

app.get('/write', function(req, resp){
    resp.sendFile(__dirname + '/write.html')
});

app.post('/add', function(req, resp){
    db.collection('counter').findOne({name: '계시물갯수'}, function(err, result){
        if(err) return console.log(err);
        var tp = result.totalPost;
        
        db.collection('post').insertOne({_id: tp + 1, title: req.body.title, date: req.body.date}, function(err,result) {
            if(err) return console.log(err);
            resp.send('저장완료')

            db.collection('counter').updateOne({name: '계시물갯수'}, {$inc : {totalPost:1}}, function(err, result){
                if(err) return console.log(err);
            });
        });
    });
});


app.get('/list', function(req, resp) {
    db.collection('post').find().toArray((function(err, result){

    resp.render('list.ejs', {posts: result})
    }))
})


var db;

MongoClient.connect('mongodb+srv://uhas2002:uhas2002@cluster0.0m1w8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err, client){
    if(err) return console.log(err);

    db = client.db('todoapp');

    db.collection('post').insertOne({_id : 0, name : 'ryu', age: 32}, function(err,result){
        console.log('저장완료');
    });

    app.listen(8080, function(){
        console.log('listening on 8080')
    });
});

