

// Model == data, objects, Node, Express. // ruby == ActiveRecord
// in this case my model will be powered by Backbone
// View == powered by Handlebars. //ruby =======ActionView
// Controller == Node, Backbone and F/E js //ruby  =ActionController
var Model= function(){
    var worktypes= require('./websites.json').work
        , model = {}
        , categories, id, type, ref, arr = [];
    for( var i in worktypes ){
        categories = worktypes[i];
            id = categories.id;
            type = categories.type;
            ref = categories.ref;
            model = categories;
            model.id = id;
            model.type = type;
            model.ref = ref;
        arr.push(model);
    }

    return arr;
};
var work = new Model;
exports.work = work;
//console.log("bh" + work.length);


