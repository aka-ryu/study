var router = require('express').Router();

router.get('/shop', function(req, resp){
    resp.render('login.ejs')
});

module.exports = router;