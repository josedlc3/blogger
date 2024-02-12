/* GET 'home' page */
module.exports.homepage = function(req, res){
    res.render('home', { title: "Jose De La Cruz's Blog Site"});
};

/* GET 'blogList' page */
module.exports.bloglist = function(req, res){
    res.render('blogList', { title: 'Blog List',
        blogs:[            
            { title: 'Blog Entry 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { title: 'Blog Entry 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { title: 'Blog Entry 3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
        ]
    });
};

/* GET 'blogAdd' page */
module.exports.blogadd = function(req, res){
    res.render('blogAdd', { title: 'Blog Add' });
};

/* GET 'blogEdit' page */
module.exports.blogedit = function(req, res){
    res.render('blogEdit', { title: 'Blog Edit' });
};

/* GET 'blogDeletion' page */
module.exports.blogdeletion = function(req, res){
    res.render('blogDeletion', { title: 'Blog Deletion' });
};