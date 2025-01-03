const Like = require('../../likes/models/like');
const Post = require('../models/post');
const PostRepository = require('../repository/postRepository');

/**
 * Create a new post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object containing the user id.
 * @param {string} req.body.content - The content of the post.
 * @param {string} req.body.imageURL - The URL of the post image.
 * @param {string} req.body.linkURL - The URL of the post link.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the post is created.
 */
async function createPost(req, res, next) {
  try {
    const { id } = req.user; // Assuming user id is available in request user object
    const { content, imageURL, linkURL } = req.body;
    const post = await PostRepository.createPost(id, content, imageURL, linkURL);
    await Post.populate(post, { path: 'user', select: 'email' });
    
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = req.params.postId;
    await PostRepository.deletePost(postId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves all posts.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves with the JSON response containing all posts.
 */
async function getAllPosts(req, res, next) {
  try {
    // const userId = req.user.id; // Assuming user id is available in request user object
    const posts = await PostRepository.getAllPosts();
    const postsWithLikes = await Promise.all(posts.map(async (post) => {
      const likesCount = await Like.countDocuments({ post: post._id });
      const currentUserLiked = await Like.exists({ post: post._id, user: userId });
      console.log(likesCount, post);
      return { ...post.toObject(), likesCount, currentUserLiked };
    }));
    res.json(postsWithLikes);
  } catch (error) {
    next(error);
  }
}
async function getPostById(req, res, next) {
  try {
    const postId = req.params.postId;
    const post = await PostRepository.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    const postId = req.params.postId;
    const updatedFields = req.body;
    const updatedPost = await PostRepository.updatePost(postId, updatedFields);
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
};
