// LikeRepository.js
const Like = require('../models/like');

async function addLike(userId, postId) {
    const like = new Like({ user: userId, post: postId });
    return await like.save();
}

async function removeLike(userId, postId) {
    return await Like.deleteOne({ user: userId, post: postId });
}

async function getLikeByUserAndPost(userId, postId) {
    return await Like.findOne({ user: userId, post: postId });
}

module.exports = { addLike, removeLike, getLikeByUserAndPost };
