// likeRoutes.js
const express = require('express');
const { addLikeToPost, removeLikeFromPost } = require('../controllers/likeController');
const authenticateToken = require('../../auth/middlewares/jwtMiddlewares');
const router = express.Router();

router.post('/', authenticateToken, addLikeToPost);
router.delete('/', authenticateToken, removeLikeFromPost);

module.exports = router;