// LikeController.js
const { addLike, removeLike, getLikeByUserAndPost } = require('../repositories/likeRepository');

async function addLikeToPost(req, res, next) {
    try {
        const { postId } = req.body;
        const { id } = req.user;
        
        // Check if the user has already liked the post
        const existingLike = await getLikeByUserAndPost(id, postId);
        if (existingLike) {
            return res.status(400).json({ error: 'User has already liked this post' });
        }
        
        const like = await addLike(id, postId);
        res.status(201).json(like);
    } catch (error) {
        next(error);
    }
}

async function removeLikeFromPost(req, res, next) {
    try {
        const { postId } = req.body;
        const { id } = req.user;
        await removeLike(id, postId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = { addLikeToPost, removeLikeFromPost };