var model = require('../models/model.js');

module.exports.controller = function(app){
    app.get('/', function(req, res){
        res.render('../views/index');
    });
    app.get('/contact', function(req, res){
       res.render('../views/contact');
    });
}

exports.index = function(req, res){
    res.render('index');
}
exports.contact = function(req, res){
    res.render('contact');
}