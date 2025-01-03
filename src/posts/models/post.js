const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  imageURL: { type: String },
  linkURL: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
