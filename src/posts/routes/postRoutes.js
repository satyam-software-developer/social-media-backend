const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const authenticateToken = require('../../auth/middlewares/jwtMiddlewares');

// Middleware to protect routes (assuming authentication middleware is implemented)
// router.use(authenticateToken);

router.post('/', PostController.createPost);
router.delete('/:postId', PostController.deletePost);
router.get('/', PostController.getAllPosts);
router.get('/:postId', PostController.getPostById);
router.put('/:postId', PostController.updatePost);

module.exports = router;
