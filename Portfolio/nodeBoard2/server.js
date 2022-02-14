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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


app.use(session({secret : 'key', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

var db;

MongoClient.connect(process.env.DB_URL, function(err, client){
    if(err) return console.log(err);

    db = client.db('todoapp');

    app.listen(process.env.PORT, function(){
        console.log('listening on 8080')
    });
});

app.get('/', function(req, resp){

    // const page = Number(req.query.pageNum) || 1;
    // const skipSize = (4-1) * 10;
    // const limitSize = 10;
    // const pageNum = 1;

    // db.collection('board').find().sort({_id : -1}).skip(skipSize).limit(limitSize).toArray((function(err, result){
    // resp.render('list.ejs', {board : result});
    // }));
    resp.send("<script type='text/javascript'>  window.location='/list/1'; </script>");
});

app.get('/list/:id', async function(req, resp){

    const page = parseInt(req.params.id) || 1;
    const pagenation = (Math.floor(((page*10)-10)/100) );
    const skipSize = (page-1) * 10;
    const limitSize = 10;
    const maxPage = Math.ceil(await db.collection('board').count() / 10);
    const startPage = maxPage - 9;
    const pageSize = 10;
    const user = req.user || "비회원";



    db.collection('board').find().sort({_id : -1}).skip(skipSize).limit(limitSize).toArray((function(err, result){
    resp.render('list.ejs', 
                {
                    board : result,
                    page : page,
                    maxPage : maxPage,
                    pageSize : pageSize,
                    startPage : startPage,
                    pagenation : pagenation,
                    user : user
                });
    }));
});

app.get('/register',loginCheck, function(req, resp){
    const user = req.user;
    console.log(user);
    resp.render('register.ejs', {user : user});
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
    const user = req.user || "비회원";

    db.collection('board').findOne({ _id : parseInt(req.params.id) }, function(err, result){
        if(err) return console.log(err);

        resp.render('detail.ejs',{ data : result, user: user});
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

app.get('/login', function(req, resp){
    resp.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(req, resp){
    resp.redirect('/');
})

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

app.get('/fail', function(req, resp){
    resp.send("<script type='text/javascript'>  window.location='/login'; alert('아이디,비밀번호를 확인하세요.'); </script>");
})

function loginCheck(req, resp, next) {
    if(req.user){
        next()
    } else {
        resp.send("<script type='text/javascript'> alert('글 작성은 회원만 가능합니다.'); window.location='/'; </script>");
    }
};


app.get('/logout', function(req, resp){
    req.session.destroy(function(err){
        if(err) console.log(err);

        resp.redirect('/');
    })
})

app.get('/join', function(req, resp){
    resp.render('join.ejs')
})

app.post('/join', function(req,resp){
    db.collection('user').findOne({id: req.body.id}, function(err, result){
        if(result == null) {
            db.collection('user').insertOne({id: req.body.id, pw: req.body.pw});
            resp.send("<script type='text/javascript'> alert('회원가입이 완료되었습니다.'); window.location='/'; </script>");
        } else if(result != null) {
            resp.send("<script type='text/javascript'> alert('중복된 아이디가 존재합니다.'); window.location='/join'; </script>");
        }
    });
    
});

app.use('/', require('./routes/shop'));