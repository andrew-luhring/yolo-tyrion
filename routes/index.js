
/*
 * GET home page.
 */
app = module.parent.exports.app;
var indexController = require('../controllers/index');

app.get('/', indexController.index);
app.get('/contact', indexController.contact);
app.get('/blog', indexController.blog);


/*
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/
