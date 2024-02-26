var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* homepage */
router.get('/', ctrlBlog.homepage);

/* Blog List */
router.get('/bloglist', ctrlBlog.bloglist);

/* Blog Add */
router.get('/blogadd', ctrlBlog.blogadd);

/* Blog Edit */
router.get('/blogedit/:blogid', ctrlBlog.blogedit);

/* Blog Deletion */
router.get('/blogdeletion/blogid', ctrlBlog.blogdeletion);

module.exports = router;
