
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , swig = require('swig')
    , angular = require('angular');

var app = express();
var swig  = require('swig');
swig.renderFile('views/layout.html', {
});
// all environments
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.get('/', function(req, res){
	//	res.render('index.html');
	//    });

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
