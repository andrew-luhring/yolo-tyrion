var model = require('../models/model')
    , fs = require('fs')
    , path = require('path')
    , xhbs = require('express-hbs')
    , angular = require('angular')
    , Backbone = require('backbone')
    , worktype = require('../models/websites')
    , Hook
    , AppRouter;




module.exports.controller = function(app){
    app.set('views', __dirname + '/views');
    app.engine('xhbs', xhbs.express3({
        partialsDir: __dirname + '/views/partials',
        defaultLayout: __dirname + '/views/default.hbs',
        contentHelperName: 'content'
    }));

    app.get('/', function(req, res){
        res.render('../views/index');
    });
    app.get('/contact', function(req, res){
       res.render('../views/contact');
    });
    app.get('/blog', function(req, res){
        res.render('../views/blog');
    });
}

exports.index = function(req, res){
    res.render('index');
}
exports.contact = function(req, res){
    res.render('contact');
}
exports.blog= function(req, res){
    res.render('blog');
}

/*
 * What the fuck it is that I'm trying to do.
 *
 * Backbone will be reading the content from the websites.json file
 * and then it will be using its' (backbones's) router
 * to determine which content should be passed into the
 * handlebar templates' view.
 *
 *
 * */


/*
 AppRouter = Backbone.Router.extend({
 routes: {
 "worktypes/:category": "worktype"
 },
 worktype: function (category) {
 }
 });

 var app = new AppRouter();
 */
