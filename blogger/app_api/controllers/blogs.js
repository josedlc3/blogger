var mongoose = require('mongoose');
var request = require('request');
var Blo = mongoose.model('Blog');

module.exports.listAllBlogs = function (req, res) {
    Blo.find()
        .exec()
        .then(results => {
            if (!results || results.length === 0) {
                sendJsonResponse(res, 404, {
                    "message": "No blogs found"
                });
            } else {
                console.log(results);
                sendJsonResponse(res, 200, buildBlogList(req, res, results));
            }
        })
        .catch(err => {
            console.log(err);
            sendJsonResponse(res, 500, err);
        });
};

module.exports.getSingleBlog = function (req, res) {
    Blo
        .findById(req.params.blogid)
        .exec()
        .then(blog => {
            sendJsonResponse(res, 200, blog);
        })
        .catch(err => {
            console.error(err);
            sendJsonResponse(res, 500, { "error": "Internal Server Error" });
        });
};

module.exports.createNewBlog = async function (req, res) {
    try {
        const blog = await Blo.create({
            blogTitle: req.body.blogTitle,
            blogEntry: req.body.blogEntry,
            createdOn: req.body.createdOn
        });
        console.log(blog);
        sendJsonResponse(res, 201, blog);
    } catch (err) {
        console.log(err);
        sendJsonResponse(res, 400, err);
    }
};


module.exports.updateSingleBlog = function (req, res) {
    if (!req.body.blogTitle || !req.body.blogEntry) {
        sendJsonResponse(res, 400, { error: "Both blogTitle and blogEntry are required in the request body." });
        return;
    }
    
    Blo
    .findById(req.params.blogid)
    .exec(
        function(err, blog) {
            blog.blogTitle = req.body.blogTitle;
            blog.blogEntry = req.body.blogEntry;
            blog.save(function(err, blog){
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, blog);
                }
            });
        }
    );
};

module.exports.deleteSingleBlog = function (req, res) {
    Blo
    .findByIdAndRemove(req.params.id)
    .exec (
        function(err, response) {
            if (err) {
                 sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 204, null);
            }
        }
    );
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var buildBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function(obj) {
      blogs.push({
        blogTitle: obj.blogTitle,
        blogEntry: obj.blogEntry,
        createdOn: obj.createdOn,
        _id: obj._id
      });
    });
    return blogs;
  };
