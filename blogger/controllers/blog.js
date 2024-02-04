/* GET 'index' page */
module.exports.homepage = function(req, res){
    res.render('index', { title: "Jose De La Cruz's Blog Site"});
};

/* GET 'blogList' page */
module.exports.bloglist = function(req, res){
    res.render('blogList', { title: 'Blog List' });
};

/* GET 'blogAdd' page */
module.exports.blogadd = function(req, res){
    res.render('blogAdd', { title: 'Blog Add' });
};