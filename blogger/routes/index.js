var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* homepage */
router.get('/', ctrlBlog.homepage);

/* Blog List */
router.get('/bloglist', ctrlBlog.bloglist);

/* Blog Add */
router.get('/blogadd', ctrlBlog.blogadd);

module.exports = router;
