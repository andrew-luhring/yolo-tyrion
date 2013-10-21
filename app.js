var express = require('express')
    , fs = require('fs')
    //, router = require('./routes/router')
    , http = require('http')
    , path = require('path')
    , hbs = require('express-hbs')
    , angular = require('angular')
    , Backbone = require('backbone')
    , app = express();
/*
    , AppRouter = Backbone.Router.extend({
        routes: {
            "worktypes/:category": "worktype"
        },
        worktype: function (category) {
        }
    })
    , app = new AppRouter();
*/
    //.use(app.router);
    //.set('views', __dirname + '/views');

    app.set('view engine', 'hbs').set('port', process.env.PORT || 5000);
    app.use(express.static('public')).use(express.bodyParser());
    app.engine('hbs', hbs.express3({
        partialsDir: __dirname + '/views/partials',
        defaultLayout: __dirname + '/views/default.hbs',
        contentHelperName: 'content',

    }));
    app.set('cache', false);
//Dynamically include routes
app.get('/', function (req, res) {
    res.render('index');
});

module.exports.app = app;
//routes = require('./routes')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
