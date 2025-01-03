const mongoose = require('mongoose');
const { Schema } = mongoose;

const followSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  following: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
