
/*
 * GET home page.
 */
var app = module.parent.exports.app
    , mainController= require('../controllers/controller')
    , Backbone = require('backbone')
    , fs= require('fs');
//    , AppRouter = Backbone.Router.extend({
//            routes: {
//                "worktypes/:category": "worktype"
//            },
//            worktype: function (category) {
//                console.log(category);
//            }
//     });
//
//
//fs.readdirSync('../controllers').forEach(function (file) {
//    if (file.substr(-3) === '.js') {
//        route = require('../controllers/' + file);
//        route.controller(app);
//    }
//});


//var appderp = new AppRouter();
app.get('/', mainController.index);
/*
app.get('/contact', mainController.contact);
app.get('/blog', mainController.blog);
*/

