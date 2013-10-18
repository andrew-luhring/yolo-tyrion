
/**
 * Module dependencies.
 */

var express = require('express')
    , when = require('when')
    , _ = require('underscore')
    , semver = require('semver')
    , fs = require('fs')
    , path = require('path')
    , hbs = require('express-hbs')
    , http = require('http')
    , app = express()
    , angular = require('angular')
    , category = require('./public/js/websites.json')
    , loading = when.defer()
    , server = express();

function notMe(){
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler());
}

    app.use(express.static(__dirname, 'public'));
    app.set('port', process.env.PORT || 5000);
    app.engine('hbs', hbs.express3({
        partialsDir: __dirname + '/views/partials',
        defaultLayout: __dirname + '/views/default.hbs',
        layoutsDir: __dirname + '/views/',
        contentHelperName: 'content',
        extname: '.hbs'

    }));
hbs.express3({
    partialsDir: "{String} [Required] Path to partials templates",

    extname: "{String} Extension for templates, defaults to `.hbs`",
    handlebars: "{Module} Use external handlebars instead of express-hbs dependency",
    layoutsDir: "{String} Path to layout templates",
    templateOptions: "{Object} options to pass to template()"
});
    app.set('view engine', 'hbs');
    app.set('views', __dirname + '/views');

notMe();



// Register sync helper
hbs.registerHelper('link', function (text, options) {
    var attrs = [];
    for (var prop in options.hash) {
        attrs.push(prop + '="' + options.hash[prop] + '"');
    }
    return new hbs.SafeString(
        "<a " + attrs.join(" ") + ">" + text + "</a>"
    );
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
