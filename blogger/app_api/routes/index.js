var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');
var ctrlGames = require('../controllers/games');

router.get('/blogs', ctrlBlogs.listAllBlogs);
router.post('/blogs', auth, ctrlBlogs.createNewBlog);
router.get('/blogs/:blogid', ctrlBlogs.getSingleBlog);
router.put('/blogs/:blogid', auth, ctrlBlogs.updateSingleBlog);
router.delete('/blogs/:blogid', auth, ctrlBlogs.deleteSingleBlog);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/games', ctrlGames.createGame);
router.get('/games', ctrlGames.getGame);
router.put('/games', ctrlGames.makeMove);
router.delete('/games', ctrlGames.deleteGame);


module.exports = router;
