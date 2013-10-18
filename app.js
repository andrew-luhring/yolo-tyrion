
/**
 * Module dependencies.
 */

var express = require('express')
    , fs = require('fs')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , swig = require('swig')
    , hbs = require('hbs')
    , app = express()
    , angular = require('angular')
    , backbone = require('backbone');

function notMe(){
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler());
}

swig.renderFile('views/layout.html', { });

app.configure('development', function(){
    app.set('port', process.env.PORT || 5000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);
    app.use(express.static(path.join(__dirname, 'public')));
   notMe();
});


//Dynamically include routes
fs.readdirSync('./controllers').forEach(function(file){
   if(file.substr(-3) === '.js'){
       route = require('./controllers/' + file);
       route.controller(app);
   }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports.app = app;
routes = require('./routes')
