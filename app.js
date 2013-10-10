var express = require('express')
    , http = require('http')
    , path = require('path')
    , swig = require('swig')
    , angular = require('angular'),
    app = express(),
    template = swig.compileFile('views/layout.html'),
    layout = 'views/layout.html';
function swigRenderFile(file){
    return swig.renderFile(file);
}


app.set('port', process.env.PORT || 5000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('styles', '/public/styles');
    var v = swig.compileFile(layout),
    views = app.get('views'),
    styles = app.get('styles');

app.get('*', function(req, res){
    var reqUrl = swigRenderFile(views + req.url);
    console.log(reqUrl);
    //res.send(reqUrl);
});
app.get('styles/*', function(req, res){
    var reqUrl = styles + req.url;
    //res.send(reqUrl);
    console.log(reqUrl + " styles");
});
//app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', function(req, res){
//    console.log(req);
//console.log(request);

});*/

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


