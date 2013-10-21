var express = require('express')
    , fs = require('fs')
    //, router = require('./routes/router')
    , http = require('http')
    , path = require('path')
    , swig = require('swig')
    , hbs = require('hbs')
    , xhbs = require('express-hbs')
    , app = express()
    , angular = require('angular')
    , Backbone = require('backbone')
    , AppRouter;

//    AppRouter = Backbone.Router.extend({
//       routes:{
//           "": "list",
//           "menu-items/new" : "itemForm",
//           "menu-items/new" : "itemDetails"
//       },
//        list: function(){
//
//        }
//    });




app.set('view engine', 'hbs');
    app.set('port', process.env.PORT || 5000);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler());
app.set('views', __dirname + '/views');
app.engine('xhbs', xhbs.express3({
    partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/default.hbs',
    contentHelperName: 'content'
}));
//Dynamically include routes

module.exports.app = app;
//routes = require('./routes')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


