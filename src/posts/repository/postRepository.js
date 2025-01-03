const Post = require('../models/post');

async function createPost(userId, content, imageURL, linkURL) {
  const post = await Post.create({ user: userId, content, imageURL, linkURL });
  return post;
}

async function deletePost(postId) {
  await Post.findByIdAndDelete(postId);
}

async function getAllPosts() {
  const posts = await Post.find().populate('user', 'email'); // Populate user field with email
  return posts;
}

async function getPostById(postId) {
  const post = await Post.findById(postId).populate('user', 'email'); // Populate user field with email
  return post;
}

async function updatePost(postId, updatedFields) {
  const post = await Post.findByIdAndUpdate(postId, updatedFields, { new: true });
  return post;
}

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
};
