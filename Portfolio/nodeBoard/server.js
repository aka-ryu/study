const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
require('date-utils');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


var db;

MongoClient.connect(process.env.DB_URL, function(err, client){
    if(err) return console.log(err);

    db = client.db('todoapp');

    app.listen(process.env.PORT, function(){
        console.log('listening on 8080')
    });
});

app.get('/', function(req, resp){

    

    db.collection('board').find().toArray((function(err, result){
    resp.render('list.ejs', {board : result});
    }));
});

app.get('/register', function(req, resp){
    resp.render('register.ejs');
});

app.post('/add', function(req, resp){
    db.collection('counter').findOne({name: '계시물갯수'}, function(err, result){
        if(err) return console.log(err);
        var tp = result.totalPost;

        var date = new Date();
        var time = date.toFormat('YYYY/MM/DD')
        db.collection('board').insertOne({_id: tp + 1, title: req.body.title, content: req.body.content, writer: req.body.writer, date: time}, function(err, result){
            if(err) return console.log(err);

            db.collection('counter').updateOne({name: '계시물갯수'}, {$inc : {totalPost:1}}, function(err,result){
                if(err) return console.log(err);
            });
        });
    });
    resp.send("<script type='text/javascript'> alert('등록되었습니다.'); window.location='/'; </script>");
    
});


app.get('/detail/:id', function(req, resp){
    
    db.collection('board').findOne({ _id : parseInt(req.params.id) }, function(err, result){
        if(err) return console.log(err);

        resp.render('detail.ejs',{ data : result});
    });

});

app.get('/update/:id', function(req, resp){
    db.collection('board').findOne({_id : parseInt(req.params.id)}, function(err, result){
        if(err) return console.log(err);

        resp.render('update.ejs', { data : result});
    });
});

app.put('/update', function(req, resp){
    
    db.collection('board').updateOne({_id: parseInt(req.body.id)}, { $set : { title : req.body.title, content : req.body.content, writer : req.body.writer }}, function(err, result){
        if(err) console.log(err);

        resp.send("<script type='text/javascript'> alert('수정되었습니다.'); window.location='/'; </script>");
    });
});


app.delete('/delete', function(req, resp){
    console.log(req.body._id)
    db.collection('board').deleteOne({_id : parseInt(req.body._id)}, function(err, result){
        if(err) return console.log(err);

        console.log('삭제완료');
        resp.status(200).send('성공');
    }); 
});

app.get('/search', function(req, resp){
    db.collection('board').find( {$text: { $search: req.query.value } } ).toArray(function(err, result){
        console.log(result);
        resp.render('search.ejs', { board : result })
    });
});