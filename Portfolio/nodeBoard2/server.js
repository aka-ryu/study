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
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);


app.use(session({secret : 'key', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

var db;

MongoClient.connect(process.env.DB_URL, function(err, client){
    if(err) return console.log(err);

    db = client.db('todoapp');

    http.listen(process.env.PORT, function(){
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
    const user = req.user || "λΉνμ";



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
    db.collection('counter').findOne({name: 'κ³μλ¬Όκ°―μ'}, function(err, result){
        if(err) return console.log(err);
        var tp = result.totalPost;

        var date = new Date();
        var time = date.toFormat('YYYY/MM/DD')
        db.collection('board').insertOne({_id: tp + 1, title: req.body.title, content: req.body.content, writer: req.body.writer, date: time}, function(err, result){
            if(err) return console.log(err);

            db.collection('counter').updateOne({name: 'κ³μλ¬Όκ°―μ'}, {$inc : {totalPost:1}}, function(err,result){
                if(err) return console.log(err);
            });
        });
    });
    resp.send("<script type='text/javascript'> alert('λ±λ‘λμμ΅λλ€.'); window.location='/'; </script>");
    
});


app.get('/detail/:id', function(req, resp){
    const user = req.user || "λΉνμ";

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

        resp.send("<script type='text/javascript'> alert('μμ λμμ΅λλ€.'); window.location='/'; </script>");
    });
});


app.delete('/delete', function(req, resp){
    console.log(req.body._id)
    db.collection('board').deleteOne({_id : parseInt(req.body._id)}, function(err, result){
        if(err) return console.log(err);

        console.log('μ­μ μλ£');
        resp.status(200).send('μ±κ³΅');
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

        if (!result) return done(null, false, { message: 'μ‘΄μ¬νμ§μλ μμ΄λμ' })
    
        if (inputpw == result.pw) {
        return done(null, result)
        } else {
        return done(null, false, { message: 'λΉλ²νλ Έμ΄μ' })
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
    resp.send("<script type='text/javascript'>  window.location='/login'; alert('μμ΄λ,λΉλ°λ²νΈλ₯Ό νμΈνμΈμ.'); </script>");
})

function loginCheck(req, resp, next) {
    if(req.user){
        next()
    } else {
        resp.send("<script type='text/javascript'> alert('κΈ μμ±μ νμλ§ κ°λ₯ν©λλ€.'); window.location='/'; </script>");
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
            resp.send("<script type='text/javascript'> alert('νμκ°μμ΄ μλ£λμμ΅λλ€.'); window.location='/'; </script>");
        } else if(result != null) {
            resp.send("<script type='text/javascript'> alert('μ€λ³΅λ μμ΄λκ° μ‘΄μ¬ν©λλ€.'); window.location='/join'; </script>");
        }
    });
    
});

app.use('/', require('./routes/shop'));

app.get('/socket', function(req, resp){
    resp.render('socket.ejs');
});

io.on('connection', function(socket){
    console.log('μ μμ±κ³΅')


    socket.on('user-send', function(data){
        io.emit('broadcast', data)
    });
    // 1:1 ν΅μ μ io.to(socket.id).emit μΌλ‘ id μ λ§λ μ μ μκ²λ§ μ μ‘  (κ·μλ§κΈ°λ₯λ±)

    socket.on('room1-join', function(){
        socket.join('room1');
        console.log('room1 μμ₯ μλ£')
    })

    socket.on('room1-send', function(data){
        io.to('room1').emit('broadcast', data)
        console.log(data)
    })
}); 