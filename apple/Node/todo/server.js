const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;
const { all } = require('express/lib/application');
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/pet', function(req, resp){
    resp.send('펫 페이지');
});

app.get('/beauty', function(req, resp){
    resp.send('뷰티 페이지');
});

app.get('/', function(req, resp){
    resp.render('index.ejs')
});

app.get('/write', function(req, resp){
    resp.render('write.ejs');
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

MongoClient.connect(process.env.DB_URL, function(err, client){
    if(err) return console.log(err);

    db = client.db('todoapp');

    app.listen(process.env.PORT, function(){
        console.log('listening on 8080')
    });
});


app.delete('/delete', function(req, resp){
    console.log(req.body);
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, function(err, result){
        if(err) return console.log(err);

        console.log('삭제완료');
        resp.status(200).send('성공');
    })
});

app.get('/detail/:id', function(req, resp){
    
    db.collection('post').findOne({ _id : parseInt(req.params.id) }, function(err, result){
        console.log(result);
        resp.render('detail.ejs',{ data : result});
    });

});


app.get('/edit/:id', function(req, resp){
    
    db.collection('post').findOne({ _id : parseInt(req.params.id) }, function(err, result){
        resp.render('edit.ejs', { data : result})
    });
});

app.put('/edit', function(req, resp){
    db.collection('post').updateOne({_id : parseInt(req.body.id) },{ $set : { title: req.body.title, date: req.body.date }}, function(err, result){
        resp.redirect('/list')
    });
});





app.get('/login', function(req, resp){
    resp.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
    failureRedirect : '/fail'
}), function(req, resp){
    resp.redirect('/');
});



passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
}, function (inputid, inputpw, done) {
    
    db.collection('user').findOne({ id: inputid }, function (err, result) {
        if (err) return done(err)

        if (!result) return done(null, false, { message: '존재하지않는 아이디요' })
    
        if (inputpw == result.pw) {
        return done(null, result)
        } else {
        return done(null, false, { message: '비번틀렸어요' })
        }
    });
}));

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(userid, done){
    db.collection('user').findOne({id: userid}, function(err, result){

        done(null, result)
    })
});


app.get('/mypage', loginOn, function(req, resp){
    resp.render('mypage.ejs', { user : req.user })
});


function loginOn(req, resp, next){
    if (req.user){
        next()
    } else {
        resp.send('로그인한 유저만 이용할수있습니다.')
    }
};


app.get('/search', function(req, resp){
    db.collection('post').find( {$text: { $search: req.query.value } } ).toArray(function(err, result){
        resp.render('search.ejs', {posts : result})
    });
});