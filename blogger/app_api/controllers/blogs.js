var mongoose = require('mongoose');
var Blo = mongoose.model('Blog');

module.exports.listAllBlogs = function (req, res) {
    Blo
    .find()
    .exec(function(err, results) {
      if (!results) {
        sendJsonResponse(res, 404, {
          "message": "no locations found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      }
      console.log(results);
      sendJsonResponse(res, 200, buildBlogList(req, res, results));
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

module.exports.createNewBlog = function (req, res) {
    Blo
    .create({
        blogTitle: req.body.blogTitle,
        blogEntry: req.body.blogEntry
    }, function(err, blog) {
        if (err) {
            console.log(err);
            sendJsonResponse(res, 400, err);
         } else {
            console.log(blog);
            sendJsonResponse(res, 201, blog);
         }
    })
};


module.exports.updateSingleBlog = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.deleteSingleBlog = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var buildBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function(obj) {
      blogs.push({
        name: obj.blogTitle,
        address: obj.blogEntry,
        rating: obj.createdOn,
        _id: obj._id
      });
    });
    return blogs;
  };
