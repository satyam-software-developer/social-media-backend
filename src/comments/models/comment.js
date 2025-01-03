const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }, // For nested comments
  post: { type: Schema.Types.ObjectId, ref: 'Post' }, // For top-level comments
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
