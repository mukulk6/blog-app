const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');
const middleware = require('../security/middleware');
const Blogcontroller = require('../controllers/blogcontroller');

router.post('/register',UserController.registerUser);
router.post('/login',UserController.loginUser);
router.get('/users',middleware.decodeToken,UserController.getUsers);
router.get('/usermail',middleware.decodeToken,UserController.userMail);
router.post('/blogs',middleware.decodeToken,Blogcontroller.createBlogs);
router.get('/getblog',middleware.decodeToken,Blogcontroller.getBlog);
router.get('/blogbyid/:blogid',middleware.decodeToken,Blogcontroller.getBlogOne);
router.get('/blogby/:userid',middleware.decodeToken,Blogcontroller.getAllBlogsBy);

module.exports = router;