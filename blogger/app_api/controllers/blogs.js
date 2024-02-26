var mongoose = require('mongoose');
var Blo = mongoose.model('Blog');

module.exports.listAllBlogs = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
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
        .find()
        .exec()
        .then(blog => {
            sendJsonResponse(res, 200, blog);
        })
        .catch(err => {
            console.error(err);
            sendJsonResponse(res, 500, { "error": "Internal Server Error" });
        });
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
