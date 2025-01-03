const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../auth/models/user');
const Post = require('../posts/models/post');
const Like = require('../likes/models/like');
const Comment = require('../comments/models/comment');
const Follow = require('../follow/models/follow');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database_dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to generate dummy data
async function seedDatabase() {
  try {
    // Dummy users
    const user1 = new User({
      email: 'user1@example.com',
      password: 'password1',
    });
    await user1.save();

    const user2 = new User({
      email: 'user2@example.com',
      password: 'password2',
    });
    await user2.save();

    // Dummy posts
    const post1 = new Post({
      user: user1._id,
      content: 'This is a sample post.',
    });
    await post1.save();

    // Dummy likes
    const like1 = new Like({
      user: user2._id,
      post: post1._id,
    });
    await like1.save();

    // Dummy comments
    const comment1 = new Comment({
      user: user2._id,
      content: 'This is a comment on the sample post.',
      post: post1._id,
    });
    await comment1.save();

    // Dummy follows
    const follow1 = new Follow({
      follower: user1._id,
      following: user2._id,
    });
    await follow1.save();

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
}

// Call the seedDatabase function
seedDatabase();
