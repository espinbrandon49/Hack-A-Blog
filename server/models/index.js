const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User ↔ Blog
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

// Blog ↔ Comment
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

// User ↔ Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };
