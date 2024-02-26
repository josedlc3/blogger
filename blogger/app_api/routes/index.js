var express = require('express');
var router = express.Router();

var ctrlBlogs = require('../controllers/blogs')

router.get('/blogs', ctrlBlogs.listAllBlogs);
router.get('/blogs/:blogid', ctrlBlogs.getSingleBlog);
router.post('/blogs', ctrlBlogs.createNewBlog);
router.put('/blogs/:blogid', ctrlBlogs.updateSingleBlog);
router.delete('/blogs/:blogid', ctrlBlogs.deleteSingleBlog);

module.exports = router;
